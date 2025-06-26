import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { SuperAdminModule } from './super-admin/super-admin.module';

@Module({
  controllers: [CoreController],
  providers: [CoreService],
  imports: [AdminModule, CustomerModule, SuperAdminModule],
})
export class CoreModule {}
