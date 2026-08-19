import mongoose, { Schema, Document, Model } from 'mongoose';
import { Project } from '@/types';

export interface IProjectDocument extends Omit<Project, 'id'>, Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const VerifiedDocSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['CRDA', 'RERA', 'BANK', 'LAYOUT_PLAN', 'TITLE_DEED', 'LEGAL'],
      default: 'CRDA',
    },
    documentNumber: { type: String, required: true },
    issuedBy: { type: String, required: true },
    issuedDate: { type: String },
    previewUrl: { type: String, required: true },
    summary: { type: String, required: true },
  },
  { _id: false }
);

const ProjectSpecificationSchema = new Schema(
  {
    category: { type: String, required: true },
    details: [{ type: String }],
  },
  { _id: false }
);

const ProjectSchema = new Schema<IProjectDocument>(
  {
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
    },
    tagline: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    city: {
      type: String,
      default: 'Amaravati / Vijayawada',
    },
    priceFrom: {
      type: String,
      required: [true, 'Starting price is required'],
    },
    pricePerSqYd: {
      type: String,
      default: '',
    },
    totalArea: {
      type: String,
      default: '',
    },
    plotSizes: {
      type: String,
      default: '',
    },
    lpNumber: {
      type: String,
      required: [true, 'LP Number is required'],
      trim: true,
    },
    reraId: {
      type: String,
      default: 'AP RERA Approved',
      trim: true,
    },
    highlights: [{ type: String }],
    approvals: [{ type: String }],
    verifiedDocs: [VerifiedDocSchema],
    images: [{ type: String }],
    overview: {
      type: String,
      default: '',
    },
    specifications: [ProjectSpecificationSchema],
    bankTieUps: [{ type: String }],
    googleMapEmbedUrl: {
      type: String,
      default: '',
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

// Prevent re-compiling model in Next.js hot reload
export const ProjectModel: Model<IProjectDocument> =
  mongoose.models.Project || mongoose.model<IProjectDocument>('Project', ProjectSchema);
