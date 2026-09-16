import crypto from 'crypto';
import { OnboardingForm, IOnboardingForm } from '../models/onboarding.model';
import { CreateOnboardingInput, UpdateOnboardingInput } from '../schemas/onboarding.schema';

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function createForm(input: CreateOnboardingInput): Promise<IOnboardingForm> {
  const existing = await OnboardingForm.findOne({ email: input.email.toLowerCase() });
  if (existing) throw new Error('An onboarding form for this email already exists');

  const form = await OnboardingForm.create({
    email: input.email.toLowerCase(),
    clientId: input.clientId ?? null,
    shareToken: generateToken(),
  });
  return form;
}

export async function findOrCreateForm(
  email: string,
  clientId?: string | null
): Promise<{ form: IOnboardingForm; created: boolean }> {
  const existing = await OnboardingForm.findOne({ email: email.toLowerCase() });
  if (existing) return { form: existing, created: false };

  const form = await OnboardingForm.create({
    email: email.toLowerCase(),
    clientId: clientId ?? null,
    shareToken: generateToken(),
  });
  return { form, created: true };
}

export async function getFormById(id: string): Promise<IOnboardingForm | null> {
  return OnboardingForm.findById(id);
}

export async function getFormByToken(token: string): Promise<IOnboardingForm | null> {
  return OnboardingForm.findOne({ shareToken: token });
}

export async function getFormByEmail(email: string): Promise<IOnboardingForm | null> {
  return OnboardingForm.findOne({ email: email.toLowerCase() });
}

export async function updateFormById(
  id: string,
  data: UpdateOnboardingInput,
  editedBy: 'admin'
): Promise<IOnboardingForm | null> {
  return OnboardingForm.findByIdAndUpdate(
    id,
    { ...data, lastEditedBy: editedBy },
    { new: true, runValidators: true }
  );
}

export async function updateFormByToken(
  token: string,
  data: UpdateOnboardingInput
): Promise<IOnboardingForm | null> {
  return OnboardingForm.findOneAndUpdate(
    { shareToken: token },
    { ...data, lastEditedBy: 'client' },
    { new: true, runValidators: true }
  );
}

export async function updateFormByEmail(
  email: string,
  data: UpdateOnboardingInput
): Promise<IOnboardingForm | null> {
  return OnboardingForm.findOneAndUpdate(
    { email: email.toLowerCase() },
    { ...data, lastEditedBy: 'client' },
    { new: true, runValidators: true }
  );
}

export async function regenerateToken(id: string): Promise<IOnboardingForm | null> {
  return OnboardingForm.findByIdAndUpdate(
    id,
    { shareToken: generateToken() },
    { new: true }
  );
}

export async function deleteForm(id: string): Promise<void> {
  await OnboardingForm.findByIdAndDelete(id);
}

export interface ListFormsParams {
  search?: string;
  page?: number;
  limit?: number;
}

export async function listForms(params: ListFormsParams = {}): Promise<{
  forms: IOnboardingForm[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const { search, page = 1, limit = 20 } = params;
  const skip = (page - 1) * limit;

  const filter: Record<string, unknown> = {};
  if (search) {
    const re = new RegExp(search, 'i');
    filter.$or = [
      { email: re },
      { companyName: re },
      { primaryContact: re },
    ];
  }

  const [forms, total] = await Promise.all([
    OnboardingForm.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit),
    OnboardingForm.countDocuments(filter),
  ]);

  return { forms, total, page, totalPages: Math.ceil(total / limit) };
}
