import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import stripeClient from './client/stripe.client';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment, PaymentPlatform } from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(@InjectRepository(Payment) private repo: Repository<Payment>) {}

  findById(id: number) {
    return this.repo.findOneBy({ id });
  }
  //TODO: Delete this later after implementing real payments
  createMock(amount: number) {
    const payment = this.repo.create({
      amount,
      platform: PaymentPlatform.STRIPE,
      ref: '123123123',
    });
    return this.repo.save(payment);
  }
}
