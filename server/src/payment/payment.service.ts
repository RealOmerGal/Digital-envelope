import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Stripe from 'stripe';
import { EntityManager, Repository } from 'typeorm';
import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import { Payment, PaymentPlatform } from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private repo: Repository<Payment>,
    @InjectStripeClient() private readonly stripeClient: Stripe,
  ) { }

  findById(id: number) {
    return this.repo.findOneBy({ id });
  }

  async create(
    price: number,
    token: any,
    email: string,
    paymentProfileId: string,
    transcationalEntityManager?: EntityManager
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
    if (transcationalEntityManager) {
      const payment = transcationalEntityManager.create(Payment, {
        amount: price,
        platform: PaymentPlatform.STRIPE,
        ref: charge.id,
      });
      return { entity: await transcationalEntityManager.save(payment), stripe: charge.id };
    } else {
      const payment = this.repo.create({
        amount: price,
        platform: PaymentPlatform.STRIPE,
        ref: charge.id,
      });
      return { entity: await this.repo.save(payment), stripe: charge.id };
    }
  }
}
