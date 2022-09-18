import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { StripeModule } from 'nestjs-stripe';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_SECRET'),
        apiVersion: '2022-08-01',
      }),
    }),
  ],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
