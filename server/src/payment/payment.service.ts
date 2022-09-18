import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { InjectStripe } from 'nestjs-stripe';
import { Payment, PaymentPlatform } from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private repo: Repository<Payment>,
    @InjectStripe() private readonly stripeClient: Stripe,
  ) {}

  findById(id: number) {
    return this.repo.findOneBy({ id });
  }

  async create(
    price: number,
    token: any,
    email: string,
    paymentProfileId: string,
  ) {
    //TODO: add peer to peer payments
    const charge = await this.stripeClient.paymentIntents.create({
      currency: 'USD',
      amount: price * 100,
      payment_method: token,
      receipt_email: email,
      // on_behalf_of: paymentProfileId,
      confirm: true,
    });
    const payment = this.repo.create({
      amount: price,
      platform: PaymentPlatform.STRIPE,
      ref: charge.id,
    });
    return { entity: await this.repo.save(payment), stripe: charge.id };
  }
}
