import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlessingDto } from './dto/create-blessing.dto';
import { Blessing } from './blessing.entity';

@Injectable()
export class BlessingService {
  constructor(@InjectRepository(Blessing) private repo: Repository<Blessing>) { }

  async create(createBlessingDto: CreateBlessingDto, paymentId: any) {
    const blessing = this.repo.create({
      event: { id: createBlessingDto.eventId },
      payment: { id: paymentId },
      ...createBlessingDto,
    });
    return await this.repo.save(blessing);
  }

  findByEvent(eventId: number) {
    return this.repo.find({
      where: { event: { id: eventId } },
      relations: ['payment', 'event'],
    });
  }
}