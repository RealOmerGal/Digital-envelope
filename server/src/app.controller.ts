import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { DashboardDto } from './dashboard/dto/dashboard.dto';
import { CurrentEvent } from './decorators/current-event.decorator';
import { Event } from './event/event.entity';
import { EventGuard } from './guards/event.guard';
import { Serialize } from './interceptors/serialize.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(EventGuard)
  @Get('/dashboard/')
  @Serialize(DashboardDto)
  async generateDashboard(@CurrentEvent() event: Event) {
    const [paidGuests, totalAmount, averagePerGuest, amountDistribution] =
      await Promise.all([
        this.appService.paidGuestsCount(event.id),
        this.appService.totalAmount(event.id),
        this.appService.averagePerGuest(event),
        this.appService.amountDistribution(event.id),
      ]);
    return { paidGuests, totalAmount, averagePerGuest, amountDistribution };
  }
}
