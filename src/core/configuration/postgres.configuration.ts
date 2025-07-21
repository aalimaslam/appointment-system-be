import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default registerAs(
  'postgres',
  (): PostgresConnectionOptions => ({
    type: process.env.DATABASE_TYPE as any,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT || 5432,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    synchronize: process.env.NODE_ENV === 'development',
    ssl: process.env.NODE_ENV === 'production',
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    logging: process.env.NODE_ENV === 'development',
    extra: {
      max: +process.env.DATABASE_MAX_CONNECTIONS || 100,
    },
  }),
);
