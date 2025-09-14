import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  username: string;
  discriminator: string;
  avatar?: string;
  language: string;
  premium: boolean;
  premiumExpiry?: Date;
  blacklisted: boolean;
  blacklistReason?: string;
  commands: number;
  experience: number;
  level: number;
  money: number;
  dailyStreak: number;
  lastDaily?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
    },
    discriminator: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    language: {
      type: String,
      default: 'pt-BR',
      enum: ['pt-BR', 'en-US', 'es-ES'],
    },
    premium: {
      type: Boolean,
      default: false,
    },
    premiumExpiry: {
      type: Date,
      default: null,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
    blacklistReason: {
      type: String,
      default: null,
      maxlength: 500,
    },
    commands: {
      type: Number,
      default: 0,
      min: 0,
    },
    experience: {
      type: Number,
      default: 0,
      min: 0,
    },
    level: {
      type: Number,
      default: 1,
      min: 1,
    },
    money: {
      type: Number,
      default: 100,
      min: 0,
    },
    dailyStreak: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastDaily: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Calculate level based on experience
userSchema.methods.calculateLevel = function(): number {
  return Math.floor(0.1 * Math.sqrt(this.experience)) + 1;
};

// Check if user can claim daily reward
userSchema.methods.canClaimDaily = function(): boolean {
  if (!this.lastDaily) return true;
  
  const now = new Date();
  const lastDaily = new Date(this.lastDaily);
  const diffHours = Math.abs(now.getTime() - lastDaily.getTime()) / 36e5;
  
  return diffHours >= 24;
};

export const UserModel = model<IUser>('User', userSchema);