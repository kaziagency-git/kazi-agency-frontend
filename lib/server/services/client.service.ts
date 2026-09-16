import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { Client, IClient } from '../models/client.model';
import {
  CreateClientInput, UpdateClientInput, WebhookClientInput,
  AddServiceProjectInput, UpdateServiceProjectInput,
  AddServiceMilestoneInput, UpdateServiceMilestoneInput,
} from '../schemas/client.schema';

function generateSetupToken(): { token: string; expiry: Date } {
  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 48 * 60 * 60 * 1000);
  return { token, expiry };
}

function sanitizeClient(client: IClient) {
  const obj = client.toObject() as any;
  obj.hasPassword = obj.passwordHash !== null;
  delete obj.passwordHash;
  return obj;
}

// ── Client creation ────────────────────────────────────────────────────────

export async function createClient(input: CreateClientInput): Promise<{ client: IClient; setupLink: string }> {
  const existing = await Client.findOne({ email: input.email.toLowerCase() });
  if (existing) throw new Error('A client with this email already exists');

  const { token, expiry } = generateSetupToken();

  const client = await Client.create({
    ...input,
    email: input.email.toLowerCase(),
    setupToken: token,
    setupTokenExpiry: expiry,
    status: 'pending',
  });

  const baseUrl = process.env.CLIENT_APP_URL ?? 'http://localhost:3000';
  const setupLink = `${baseUrl}/client/set-password?token=${token}`;

  return { client: sanitizeClient(client), setupLink };
}

export async function createClientFromWebhook(input: WebhookClientInput): Promise<{ client: IClient; setupLink: string }> {
  const existing = await Client.findOne({ email: input.email.toLowerCase() });
  if (existing) {
    const { token, expiry } = generateSetupToken();
    existing.setupToken = token;
    existing.setupTokenExpiry = expiry;
    await existing.save();

    const baseUrl = process.env.CLIENT_APP_URL ?? 'http://localhost:3000';
    const setupLink = `${baseUrl}/client/set-password?token=${token}`;
    return { client: sanitizeClient(existing), setupLink };
  }

  const { token, expiry } = generateSetupToken();

  const client = await Client.create({
    ...input,
    email: input.email.toLowerCase(),
    setupToken: token,
    setupTokenExpiry: expiry,
    status: 'pending',
    source: input.source ?? 'n8n',
  });

  const baseUrl = process.env.CLIENT_APP_URL ?? 'http://localhost:3000';
  const setupLink = `${baseUrl}/client/set-password?token=${token}`;

  return { client: sanitizeClient(client), setupLink };
}

// ── Auth ───────────────────────────────────────────────────────────────────

export async function setClientPassword(token: string, password: string): Promise<IClient> {
  const client = await Client.findOne({
    setupToken: token,
    setupTokenExpiry: { $gt: new Date() },
  });

  if (!client) throw new Error('Invalid or expired setup link');

  client.passwordHash = await bcrypt.hash(password, 12);
  client.setupToken = null;
  client.setupTokenExpiry = null;
  client.status = 'active';
  await client.save();

  return client;
}

export async function verifyClientPassword(email: string, password: string): Promise<IClient> {
  const client = await Client.findOne({ email: email.toLowerCase() });
  if (!client || !client.passwordHash) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, client.passwordHash);
  if (!valid) throw new Error('Invalid credentials');

  if (client.status === 'inactive') throw new Error('Your account has been deactivated. Please contact support.');

  return client;
}

export async function adminChangeClientPassword(id: string, password: string): Promise<void> {
  const client = await Client.findById(id);
  if (!client) throw new Error('Client not found');
  client.passwordHash = await bcrypt.hash(password, 12);
  if (client.status === 'pending') {
    client.setupToken = null;
    client.setupTokenExpiry = null;
    client.status = 'active';
  }
  await client.save();
}

// ── Client read ────────────────────────────────────────────────────────────

export interface ClientListQuery {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface ClientListResult {
  clients: any[];
  total: number;
  page: number;
  totalPages: number;
}

/**
 * Status counts across every client. Aggregated in the database rather than
 * derived from a page of results, which would only ever count one page.
 */
export async function getClientStats(): Promise<Record<string, number>> {
  const result = await Client.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const stats: Record<string, number> = { pending: 0, active: 0, inactive: 0 };
  for (const r of result) stats[r._id] = r.count;
  stats.total = Object.values(stats).reduce((a, b) => a + b, 0);
  return stats;
}

export async function getAllClients(query: ClientListQuery = {}): Promise<ClientListResult> {
  const { search, status, page = 1, limit = 20 } = query;

  const filter: Record<string, unknown> = {};

  if (status && status !== 'all') filter.status = status;

  if (search) {
    const regex = new RegExp(search, 'i');
    filter.$or = [
      { name: regex }, { email: regex }, { company: regex }, { accountManager: regex },
    ];
  }

  const skip = (page - 1) * limit;

  const [clients, total] = await Promise.all([
    Client.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-passwordHash -setupToken -setupTokenExpiry'),
    Client.countDocuments(filter),
  ]);

  return { clients, total, page, totalPages: Math.ceil(total / limit) };
}

export async function getClientById(id: string) {
  const client = await Client.findById(id).select('-setupToken -setupTokenExpiry');
  if (!client) return null;
  return sanitizeClient(client);
}

export async function getClientByEmail(email: string) {
  return Client.findOne({ email: email.toLowerCase() }).select('-passwordHash -setupToken -setupTokenExpiry');
}

// ── Client update ──────────────────────────────────────────────────────────

export async function updateClient(id: string, input: UpdateClientInput) {
  const client = await Client.findByIdAndUpdate(id, { $set: input }, { new: true, runValidators: true })
    .select('-passwordHash -setupToken -setupTokenExpiry');
  if (!client) throw new Error('Client not found');
  return client;
}

export async function regenerateSetupLink(clientId: string): Promise<string> {
  const client = await Client.findById(clientId);
  if (!client) throw new Error('Client not found');

  const { token, expiry } = generateSetupToken();
  client.setupToken = token;
  client.setupTokenExpiry = expiry;
  await client.save();

  const baseUrl = process.env.CLIENT_APP_URL ?? 'http://localhost:3000';
  return `${baseUrl}/client/set-password?token=${token}`;
}

export async function deleteClient(id: string) {
  const client = await Client.findByIdAndDelete(id);
  if (!client) throw new Error('Client not found');
}

// ── Service Projects ───────────────────────────────────────────────────────

export async function addServiceProject(clientId: string, input: AddServiceProjectInput) {
  const client = await Client.findById(clientId);
  if (!client) throw new Error('Client not found');

  const project = {
    serviceName: input.serviceName,
    status: input.status ?? 'not-started',
    currentPhase: input.currentPhase ?? '',
    progress: input.progress ?? 0,
    startDate: input.startDate ? new Date(input.startDate) : null,
    notes: input.notes ?? '',
    milestones: [],
  };

  client.serviceProjects.push(project as any);
  await client.save();
  return sanitizeClient(client);
}

export async function updateServiceProject(clientId: string, serviceId: string, input: UpdateServiceProjectInput) {
  const client = await Client.findById(clientId);
  if (!client) throw new Error('Client not found');

  const sp = client.serviceProjects.find((p) => String(p._id) === serviceId) ?? null;
  if (!sp) throw new Error('Service project not found');

  if (input.status !== undefined) sp.status = input.status;
  if (input.currentPhase !== undefined) sp.currentPhase = input.currentPhase;
  if (input.progress !== undefined) sp.progress = input.progress;
  if (input.notes !== undefined) sp.notes = input.notes;
  if (input.startDate !== undefined) sp.startDate = input.startDate ? new Date(input.startDate) : null;

  await client.save();
  return sanitizeClient(client);
}

export async function deleteServiceProject(clientId: string, serviceId: string) {
  const client = await Client.findById(clientId);
  if (!client) throw new Error('Client not found');
  client.serviceProjects = client.serviceProjects.filter((sp) => sp._id.toString() !== serviceId) as any;
  await client.save();
  return sanitizeClient(client);
}

// ── Service Milestones ─────────────────────────────────────────────────────

export async function addServiceMilestone(clientId: string, serviceId: string, input: AddServiceMilestoneInput) {
  const client = await Client.findById(clientId);
  if (!client) throw new Error('Client not found');

  const sp = client.serviceProjects.find((p) => String(p._id) === serviceId) ?? null;
  if (!sp) throw new Error('Service project not found');

  const milestone = {
    title: input.title,
    description: input.description ?? '',
    status: input.status ?? 'pending',
    dueDate: input.dueDate ? new Date(input.dueDate) : null,
    completedAt: null,
  };

  sp.milestones.push(milestone as any);
  await client.save();
  return sanitizeClient(client);
}

export async function updateServiceMilestone(
  clientId: string, serviceId: string, milestoneId: string, input: UpdateServiceMilestoneInput
) {
  const client = await Client.findById(clientId);
  if (!client) throw new Error('Client not found');

  const sp = client.serviceProjects.find((p) => String(p._id) === serviceId) ?? null;
  if (!sp) throw new Error('Service project not found');

  const ms = sp.milestones.find((m) => String(m._id) === milestoneId) ?? null;
  if (!ms) throw new Error('Milestone not found');

  if (input.title !== undefined) ms.title = input.title;
  if (input.description !== undefined) ms.description = input.description;
  if (input.dueDate !== undefined) ms.dueDate = input.dueDate ? new Date(input.dueDate) : null;
  if (input.status !== undefined) {
    ms.status = input.status;
    if (input.status === 'completed' && !ms.completedAt) ms.completedAt = new Date();
    if (input.status !== 'completed') ms.completedAt = null;
  }

  await client.save();
  return sanitizeClient(client);
}

export async function deleteServiceMilestone(clientId: string, serviceId: string, milestoneId: string) {
  const client = await Client.findById(clientId);
  if (!client) throw new Error('Client not found');

  const sp = client.serviceProjects.find((p) => String(p._id) === serviceId) ?? null;
  if (!sp) throw new Error('Service project not found');

  sp.milestones = sp.milestones.filter((m) => m._id.toString() !== milestoneId) as any;
  await client.save();
  return sanitizeClient(client);
}
