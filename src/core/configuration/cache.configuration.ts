import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
    host: process.env.CACHE_HOST,
    port: Number(process.env.CACHE_PORT),
    ttl: process.env.CACHE_TTL,
    maxConnections: process.env.CACHE_MAX_CONNECTIONS,
}));
