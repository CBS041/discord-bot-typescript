import mongoose from 'mongoose';

import { logger } from '../utils/logger';

export async function connectDatabase(url?: string): Promise<void> {
  if (!url) {
    throw new Error('Database URL is required');
  }

  try {
    await mongoose.connect(url, {
      bufferCommands: false,
    });

    logger.success('Database connected successfully');

    mongoose.connection.on('error', (error) => {
      logger.error('Database connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('Database disconnected');
    });
  } catch (error) {
    logger.error('Failed to connect to database:', error);
    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  try {
    await mongoose.disconnect();
    logger.info('Database disconnected');
  } catch (error) {
    logger.error('Error disconnecting from database:', error);
    throw error;
  }
}