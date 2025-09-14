import { Document, Schema, model } from 'mongoose';

export interface IGuild extends Document {
  guildId: string;
  name: string;
  prefix: string;
  language: string;
  muteRole?: string;
  modLogChannel?: string;
  autoRole?: string;
  welcomeChannel?: string;
  leaveChannel?: string;
  welcomeMessage?: string;
  leaveMessage?: string;
  antiSpam: boolean;
  antiLink: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const guildSchema = new Schema<IGuild>(
  {
    guildId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      default: '!',
      maxlength: 5,
    },
    language: {
      type: String,
      default: 'pt-BR',
      enum: ['pt-BR', 'en-US', 'es-ES'],
    },
    muteRole: {
      type: String,
      default: null,
    },
    modLogChannel: {
      type: String,
      default: null,
    },
    autoRole: {
      type: String,
      default: null,
    },
    welcomeChannel: {
      type: String,
      default: null,
    },
    leaveChannel: {
      type: String,
      default: null,
    },
    welcomeMessage: {
      type: String,
      default: 'Bem-vindo(a) {user} ao servidor {server}!',
      maxlength: 2000,
    },
    leaveMessage: {
      type: String,
      default: '{user} saiu do servidor {server}.',
      maxlength: 2000,
    },
    antiSpam: {
      type: Boolean,
      default: false,
    },
    antiLink: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const GuildModel = model<IGuild>('Guild', guildSchema);