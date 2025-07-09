import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import adminConfiguration from './admin.configuration';
import appConfiguration from './app.configuration';
import blobConfiguration from './blob.configuration';
import cacheConfiguration from './cache.configuration';
import firebaseConfiguration from './firebase.configuration';
import jwtConfiguration from './jwt.configuration';
import mailerConfiguration from './mailer.configuration';
import multerConfiguration from './multer.configuration';
import postgresConfiguration from './postgres.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        appConfiguration,
        jwtConfiguration,
        postgresConfiguration,
        multerConfiguration,
        mailerConfiguration,
        adminConfiguration,
        blobConfiguration,
        cacheConfiguration,
        firebaseConfiguration,
      ],
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
})
export class ConfigurationModule {}
