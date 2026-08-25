import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILeadDocument extends Document {
  name: string;
  phone: string;
  email?: string;
  projectInterest?: string;
  preferredDate?: string;
  message?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'closed' | 'lost';
  notes?: string;
  source?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILeadDocument>(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    projectInterest: {
      type: String,
      default: 'General Inquiry',
      trim: true,
    },
    preferredDate: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'scheduled', 'closed', 'lost'],
      default: 'new',
    },
    notes: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      default: 'Website - Book Visit Form',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret: any) {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Prevent re-compiling model in Next.js App Router hot reload
export const LeadModel: Model<ILeadDocument> =
  mongoose.models.Lead || mongoose.model<ILeadDocument>('Lead', LeadSchema);
