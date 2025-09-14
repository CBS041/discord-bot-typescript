import { z } from 'zod';

import { logger } from './logger';

const envSchema = z.object({
  TOKEN: z.string().min(1, 'Discord bot token is required'),
  DATABASE_URL: z.string().url('Valid database URL is required'),
  OWNER_ID: z.string().min(1, 'Owner ID is required'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export type Environment = z.infer<typeof envSchema>;

export function validateEnvironment(): Environment {
  try {
    const env = envSchema.parse(process.env);
    logger.success('Environment variables validated successfully');
    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error('Environment validation failed:');
      error.errors.forEach(err => {
        logger.error(`  ${err.path.join('.')}: ${err.message}`);
      });
    } else {
      logger.error('Unexpected error during environment validation:', error);
    }
    process.exit(1);
  }
}