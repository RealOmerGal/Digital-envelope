import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { PaymentService } from '../payment/payment.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { BlessingService } from './blessing.service';
import { BlessingDto } from './dto/blessing.dto';
import { CreateBlessingDto } from './dto/create-blessing.dto';
import { CurrentEvent } from '../decorators/current-event.decorator';
import { Event } from '../event/event.entity';
import { EventGuard } from 'src/guards/event.guard';

@Controller('blessing')
export class BlessingController {
  constructor(
    private readonly blessingService: BlessingService,
    private readonly paymentService: PaymentService,
  ) { }

  @Public()
  @Post()
  async create(@Body() dto: CreateBlessingDto) {
    //TODO: do this in a transaction
    const { amount } = dto;
    const payment = await this.paymentService.createMock(amount);
    return await this.blessingService.create(dto, payment.id);

  }
  @UseGuards(EventGuard)
  @Get()
  // @Serialize(BlessingArrayDto)
  async findByEvent(@CurrentEvent() event: Event, @Query() { take, skip }) {
    const { total, result } = await this.blessingService.findByEvent(event.id, take, skip);
    return { count: total, result };
  }
} 