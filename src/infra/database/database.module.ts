import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DATABASE_TYPE', 'postgres') as any,
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../../migrations/**/*{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE', false),
        ssl: configService.get<boolean>('DATABASE_SSL_ENABLED', false)
          ? {
              rejectUnauthorized: configService.get<boolean>(
                'DATABASE_REJECT_UNAUTHORIZED',
                false,
              ),
              ca: configService.get<string>('DATABASE_CA') || undefined,
              key: configService.get<string>('DATABASE_KEY') || undefined,
              cert: configService.get<string>('DATABASE_CERT') || undefined,
            }
          : false,
        extra: {
          max: configService.get<number>('DATABASE_MAX_CONNECTIONS', 20),
        },
      }),
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {
  constructor(private readonly databaseService: DatabaseService,
              private readonly configService: ConfigService
  ) {
    console.log(this.configService.get<string>('DATABASE_CERT'));
  }
}
