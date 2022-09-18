import { Module } from '@nestjs/common';
import { BlessingService } from './blessing.service';
import { BlessingController } from './blessing.controller';
import { Blessing } from './blessing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from '../payment/payment.module';
import { EventModule } from '../event/event.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blessing]), PaymentModule, EventModule],
  controllers: [BlessingController],
  providers: [BlessingService],
})
export class BlessingModule {}
