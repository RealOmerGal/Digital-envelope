import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../user/user.entity';

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

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
