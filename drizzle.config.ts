import type { Config } from 'drizzle-kit';

export default {
  dialect: 'sqlite',
  schema: './src/schema.ts',
  out: './drizzle',
  driver: 'expo', // <--- very important
} satisfies Config;
