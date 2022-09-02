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
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Public } from '../decorators/public.decorator';
import { PaymentService } from '../payment/payment.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { BlessingService } from './blessing.service';
import { BlessingDto } from './dto/blessing.dto';
import { CreateBlessingDto } from './dto/create-blessing.dto';

@Controller('blessing')
@UseInterceptors(CacheInterceptor)
export class BlessingController {
  constructor(
    private readonly blessingService: BlessingService,
    private readonly paymentService: PaymentService,
    @Inject(CACHE_MANAGER) private readonly cacheMenager: Cache,
  ) { }

  @Public()
  @Post()
  async create(@Body() dto: CreateBlessingDto) {
    //TODO: do this in a transaction
    const { total } = dto;
    const payment = await this.paymentService.createMock(total);
    return await this.blessingService.create(dto, payment.id);

  }
  @Get('/:eventid')
  @Serialize(BlessingDto)
  findByEvent(@Param('eventid') eventId: number) {
    return this.blessingService.findByEvent(eventId);
  }
}
