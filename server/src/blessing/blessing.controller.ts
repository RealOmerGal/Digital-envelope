import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  UseInterceptors,
  CacheInterceptor,
  CACHE_MANAGER,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
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
    const { total } = dto;
    const payment = await this.paymentService.createMock(total);
    return await this.blessingService.create(dto, payment.id);

  }
  @UseGuards(EventGuard)
  @Get()
  @Serialize(BlessingDto)
  findByEvent(@CurrentEvent() event: Event, @Query() { take, skip }) {
    return this.blessingService.findByEvent(event.id, take, skip);
  }
} 