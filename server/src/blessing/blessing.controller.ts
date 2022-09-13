import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { PaymentService } from '../payment/payment.service';
import { BlessingService } from './blessing.service';
import { CreateBlessingDto } from './dto/create-blessing.dto';
import { CurrentEvent } from '../decorators/current-event.decorator';
import { Event } from '../event/event.entity';
import { EventGuard } from 'src/guards/event.guard';
import { DataSource } from 'typeorm';

@Controller('blessing')
export class BlessingController {
  constructor(
    private readonly blessingService: BlessingService,
    private readonly paymentService: PaymentService,
    private readonly datasource: DataSource,
  ) {}

  @Public()
  @Post()
  async create(@Body() dto: CreateBlessingDto) {
    //TODO: Move transaction logic into service
    const { amount } = dto;
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const payment = await this.paymentService.createMock(amount);
      await this.blessingService.create(dto, payment.id);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  @UseGuards(EventGuard)
  @Get()
  async findByEvent(@CurrentEvent() event: Event, @Query() { take, skip }) {
    const { total, result } = await this.blessingService.findByEvent(
      event.id,
      take,
      skip,
    );
    return { count: total, result };
  }
}
