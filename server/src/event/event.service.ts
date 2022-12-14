import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  constructor(@InjectRepository(Event) private repo: Repository<Event>) { }

  create(createEventDto: CreateEventDto, user: User) {
    //If user didnt set him payment profile, event cannot be open
    if (!user.paymentProfileId) createEventDto.closed = true;
    const event = this.repo.create({
      user: { id: user.id },
      ...createEventDto,
    });
    return this.repo.save(event);
  }

  async findOne(id: number) {
    const event = await this.repo.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  findByUser(userId: string) {
    return this.repo.find({
      where: {
        user: {
          id: userId,
        },
      },
      order: {
        lastUpdatedAt: 'DESC',
      },
    });
  }

  async update(id: number, attrs: Partial<Event>, user: User) {
    if (attrs.closed === false && !user.paymentProfileId)
      throw new BadRequestException(
        'Cannot open an event without payment profile set',
      );
    const event = await this.findOne(id);
    Object.assign(event, attrs);
    return this.repo.save(event);
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
