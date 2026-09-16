import { Ticket, TicketStatus } from '../models/ticket.model';
import { CreateTicketInput } from '../schemas/ticket.schema';

export async function createTicket(
  clientId: string,
  clientName: string,
  clientEmail: string,
  input: CreateTicketInput
) {
  const ticket = await Ticket.create({
    clientId,
    clientName,
    clientEmail,
    subject: input.subject,
    category: input.category,
    priority: input.priority ?? 'Medium',
    status: 'open',
    messages: [
      {
        sender: 'client',
        senderName: clientName,
        content: input.message,
        attachments: input.attachments ?? [],
      },
    ],
  });
  return ticket;
}

export async function getClientTickets(clientId: string) {
  return Ticket.find({ clientId }).sort({ updatedAt: -1 });
}

export async function getClientTicket(clientId: string, ticketId: string) {
  const ticket = await Ticket.findOne({ _id: ticketId, clientId });
  if (!ticket) throw new Error('Ticket not found');
  return ticket;
}

export async function clientReply(
  clientId: string,
  ticketId: string,
  clientName: string,
  content: string,
  attachments: { url: string; originalName: string; size: number; mimetype: string }[] = []
) {
  const ticket = await Ticket.findOne({ _id: ticketId, clientId });
  if (!ticket) throw new Error('Ticket not found');
  if (ticket.status === 'closed') throw new Error('This ticket is closed');

  ticket.messages.push({ sender: 'client', senderName: clientName, content, attachments } as any);
  if (ticket.status === 'resolved') ticket.status = 'open';
  await ticket.save();
  return ticket;
}

export async function getAllTickets(filter?: { status?: string; clientId?: string }) {
  const query: Record<string, unknown> = {};
  if (filter?.status) query.status = filter.status;
  if (filter?.clientId) query.clientId = filter.clientId;
  return Ticket.find(query).sort({ updatedAt: -1 });
}

export async function getAdminTicket(ticketId: string) {
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) throw new Error('Ticket not found');
  return ticket;
}

export async function adminReply(
  ticketId: string,
  content: string,
  attachments: { url: string; originalName: string; size: number; mimetype: string }[] = []
) {
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) throw new Error('Ticket not found');

  ticket.messages.push({ sender: 'admin', senderName: 'Kazi Agency', content, attachments } as any);
  if (ticket.status === 'open') ticket.status = 'in-progress';
  await ticket.save();
  return ticket;
}

export async function updateTicketStatus(ticketId: string, status: TicketStatus) {
  const ticket = await Ticket.findByIdAndUpdate(ticketId, { status }, { new: true });
  if (!ticket) throw new Error('Ticket not found');
  return ticket;
}

export async function getTicketStats() {
  const [open, inProgress, resolved, closed] = await Promise.all([
    Ticket.countDocuments({ status: 'open' }),
    Ticket.countDocuments({ status: 'in-progress' }),
    Ticket.countDocuments({ status: 'resolved' }),
    Ticket.countDocuments({ status: 'closed' }),
  ]);
  return { open, inProgress, resolved, closed, total: open + inProgress + resolved + closed };
}
