import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public } from '../decorators/public.decorator';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  /*
    TODO: when real payments are implemented, re-think if this controller is really needed
          for now using the blessing controller to save new record
          to the payments repository
  */

  //TODO: Use @Redirect decorator for the paypal logic


  @Get('/:paymentId')
  findById(@Param('paymentId') paymentId: number) {
    return this.paymentService.findById(paymentId);
  }

  // @Public()
  // @Post()
  // payment(@Body() createPaymentDto: CreatePaymentDto, @Res() response: Response) {
  //   return this.paymentService.create(createPaymentDto, response);
  // }

  // @Get("/cancel")
  // canceled(@Res() res: Response) {
  //   res.send(HttpStatus.OK).json({ msg: 'payment canceled' })
  // }

}
