import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlessingDto } from './dto/create-blessing.dto';
import { Blessing } from './blessing.entity';
import { BadRequestException } from '@nestjs/common';
import { EventService } from '../event/event.service';


@Injectable()
export class BlessingService {
  constructor(@InjectRepository(Blessing) private repo: Repository<Blessing>, private eventService: EventService) { }

  async create(createBlessingDto: CreateBlessingDto, paymentId: any) {
    const event = await this.eventService.findOne(createBlessingDto.eventId);
    if (event.closed) throw new BadRequestException('Event is closed');
    const blessing = this.repo.create({
      event: { id: createBlessingDto.eventId },
      payment: { id: paymentId },
      ...createBlessingDto,
    });
    return await this.repo.save(blessing);
  }

  async findByEvent(eventId: number, take: number, skip: number) {

    const [result, total] = await this.repo.findAndCount({
      where: { event: { id: eventId } },
      take, skip,
      relations: {
        payment: true
      },
      cache: 60000
    });
    return { total, result };
  }
}