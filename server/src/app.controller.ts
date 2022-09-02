import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { DashboardDto } from './dashboard/dto/dashboard.dto';
import { Serialize } from './interceptors/serialize.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/dashboard/:eventid')
  @Serialize(DashboardDto)
  async generateDashboard(@Param('eventid') eventId: number) {

    const [paidGuests, totalAmount, averagePerGuest, amountDistribution] = await Promise.all([
      this.appService.paidGuestsCount(eventId),
      this.appService.totalAmount(eventId),
      this.appService.averagePerGuest(eventId),
      this.appService.amountDistribution(eventId)
    ])

    // const paidGuests = await this.appService.paidGuestsCount(eventId);
    // const totalAmount = await this.appService.totalAmount(eventId);
    // const averagePerGuest = await this.appService.averagePerGuest(eventId);
    // const amountDistribution = await this.appService.amountDistribution(eventId);
    return { paidGuests, totalAmount, averagePerGuest, amountDistribution };
  }
}
