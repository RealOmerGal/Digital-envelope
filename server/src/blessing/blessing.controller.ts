import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { BlessingService } from './blessing.service';
import { CreateBlessingAndPaymentDto } from './dto/create-blessing.dto';
import { CurrentEvent } from '../decorators/current-event.decorator';
import { Event } from '../event/event.entity';
import { EventGuard } from '../guards/event.guard';

@Controller('blessing')
export class BlessingController {
  constructor(private readonly blessingService: BlessingService) {}

  @Public()
  @Post()
  async create(@Body() dto: CreateBlessingAndPaymentDto): Promise<string> {
    return this.blessingService.create(dto);
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
