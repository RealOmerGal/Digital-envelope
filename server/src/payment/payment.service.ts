import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paypalClient } from './client/payment.client';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment, PaymentPlatform } from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(@InjectRepository(Payment) private repo: Repository<Payment>) { }

  findById(id: number) {
    return this.repo.findOneBy({ id });
  }
  //TODO: Delete this later after implementing real payments
  createMock(total: number) {
    const payment = this.repo.create({ amount: total, platform: PaymentPlatform.PAYPAL, ref: '123123123' });
    return this.repo.save(payment);
  }
  // create({ by, total, eventName }: CreatePaymentDto, res: Response) {
  //   const paymentData: paypalClient.Payment = {
  //     intent: 'sale',
  //     payer: {
  //       payment_method: 'paypal',
  //     },
  //     redirect_urls: {
  //       //TODO: Replace those for real urls
  //       return_url: 'http://return.url',
  //       cancel_url: 'http://cancel.url',
  //     },
  //     transactions: [
  //       {
  //         item_list: {
  //           items: [
  //             {
  //               name: by,
  //               price: total,
  //               currency: 'USD',
  //               quantity: 1,
  //             },
  //           ],
  //         },
  //         amount: {
  //           currency: 'USD',
  //           total: '1.00',
  //         },
  //         description: `${by}'s Blessing for ${eventName} `,
  //       },
  //     ],
  //   };

  //   paypalClient.payment.create(paymentData, (err, payment) => {
  //     if (err) throw err; //TODO: redirect to failure url
  //     else {
  //       payment.links.map((link) => {
  //         if (link.rel === 'approval_url') res.redirect(link.href)
  //       })
  //     }
  //   });
  // }

  success(payerID: any, paymentId: any) {

    paypalClient.payment.execute(paymentId, payerID, function (error, payment) {
      if (error) throw error;
      if (payment.state === 'approved') {
        console.log(payment);
        //TODO: Redirect to sucesss url or other success logic
      } else {
        throw new BadRequestException()
      }
    })
  }

}
