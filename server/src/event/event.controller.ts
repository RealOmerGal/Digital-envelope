import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Session,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../user/user.entity';
import { CurrentEvent } from '../decorators/current-event.decorator';
import { Event } from './event.entity';
import { EventGuard } from '../guards/event.guard';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  async create(
    @Body() createEventDto: CreateEventDto,
    @CurrentUser() user: User,
    @Session() session: any,
  ) {
    const newEvent = await this.eventService.create(createEventDto, user);
    return (session.event = newEvent);
  }

  @Get('/user')
  findByUser(@CurrentUser() user: User) {
    return this.eventService.findByUser(user.id);
  }

  @UseGuards(EventGuard)
  @Put()
  async update(
    @CurrentEvent() event: Event,
    @CurrentUser() user: User,
    @Body() updateEventDto: UpdateEventDto,
    @Session() session: any,
  ) {
    const updatedEvent = await this.eventService.update(
      event.id,
      updateEventDto,
      user
    );
    return (session.event = updatedEvent);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string, @Session() session: any) {
    await this.eventService.remove(+id);
    if (session.eventId === id) session.event = null;
  }

  @Post('/store')
  @HttpCode(HttpStatus.NO_CONTENT)
  store(@Body() body: any, @Session() session: any) {
    return (session.event = body);
  }

  @UseGuards(EventGuard)
  @Get('/current')
  current(@CurrentEvent() event: Event) {
    return event;
  }
}
