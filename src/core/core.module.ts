import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { SuperAdminModule } from './super-admin/super-admin.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  controllers: [],
  providers: [CoreService],
  imports: [
    AdminModule,
    CustomerModule,
    SuperAdminModule,
    LoggerModule,
    ConfigurationModule,
  ],
})
export class CoreModule {}
