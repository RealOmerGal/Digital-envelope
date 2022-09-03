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
import { CurrentEvent } from 'src/decorators/current-event.decorator';
import { Event } from './event.entity';
import { EventGuard } from '../guards/event.guard';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  create(@Body() createEventDto: CreateEventDto, @CurrentUser() user: User) {
    return this.eventService.create(createEventDto, user.id);
  }

  @Get('/user')
  findByUser(@CurrentUser() user: User) {
    return this.eventService.findByUser(user.id);
  }

  @UseGuards(EventGuard)
  @Put()
  update(@CurrentEvent() event: Event, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(event.id, updateEventDto);
  }

  @UseGuards(EventGuard)
  @Get('/:id')
  findOne(@CurrentEvent() event: Event) {
    return this.eventService.findOne(event.id);
  }

  @Delete('/:id')
  remove(@Param('id') id: string, @Session() session: any) {
    if (session.eventId === id) session.event = null;
    return this.eventService.remove(+id);
  }

  @Post('/store')
  @HttpCode(HttpStatus.NO_CONTENT)
  store(@Body() body: any, @Session() session: any) {
    return session.event = body;
  }

  @UseGuards(EventGuard)
  @Get('/current')
  current(@CurrentEvent() event: Event) {
    return event
  }
}
