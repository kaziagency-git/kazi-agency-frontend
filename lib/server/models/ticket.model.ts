import mongoose, { Document, Schema, Types } from 'mongoose';

export type TicketCategory = 'Technical' | 'Billing' | 'Reporting' | 'Strategy' | 'Other';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type MessageSender = 'client' | 'admin';

export interface IAttachment {
  url: string;
  originalName: string;
  size: number;
  mimetype: string;
}

export interface IMessage {
  _id: Types.ObjectId;
  sender: MessageSender;
  senderName: string;
  content: string;
  attachments: IAttachment[];
  createdAt: Date;
}

export interface ITicket extends Document {
  clientId: Types.ObjectId;
  clientName: string;
  clientEmail: string;
  ticketNumber: number;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const attachmentSchema = new Schema<IAttachment>(
  {
    url: { type: String, required: true },
    originalName: { type: String, required: true },
    size: { type: Number, required: true },
    mimetype: { type: String, required: true },
  },
  { _id: false }
);

const messageSchema = new Schema<IMessage>(
  {
    sender: { type: String, enum: ['client', 'admin'], required: true },
    senderName: { type: String, required: true },
    content: { type: String, default: '' },
    attachments: { type: [attachmentSchema], default: [] },
    createdAt: { type: Date, default: () => new Date() },
  },
  { _id: true }
);

const ticketSchema = new Schema<ITicket>(
  {
    clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true, index: true },
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true, lowercase: true, trim: true },
    ticketNumber: { type: Number, unique: true },
    subject: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Technical', 'Billing', 'Reporting', 'Strategy', 'Other'],
      required: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'resolved', 'closed'],
      default: 'open',
      index: true,
    },
    messages: [messageSchema],
  },
  { timestamps: true }
);

ticketSchema.pre('save', async function (next) {
  if (this.isNew && !this.ticketNumber) {
    let unique = false;
    while (!unique) {
      const num = Math.floor(100000 + Math.random() * 900000);
      const exists = await mongoose.model('Ticket').exists({ ticketNumber: num });
      if (!exists) {
        this.ticketNumber = num;
        unique = true;
      }
    }
  }
  next();
});

export const Ticket: mongoose.Model<ITicket> =
  (mongoose.models.Ticket as mongoose.Model<ITicket>) ??
  mongoose.model<ITicket>('Ticket', ticketSchema);
