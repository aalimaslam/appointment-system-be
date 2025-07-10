import { registerAs } from '@nestjs/config';

export default registerAs('postgres', () => ({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) || 5432,
  password: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  maxConnections: Number(process.env.DATABASE_MAX_CONNECTIONS) || 100,
  sslEnabled: process.env.DATABASE_SSL_ENABLED === 'true',
  rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
  ca: process.env.DATABASE_CA,
  key: process.env.DATABASE_KEY,
  cert: process.env.DATABASE_CERT,
}));
