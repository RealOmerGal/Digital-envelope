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

  async findByEvent(eventId: number, take: number, skip: number) {
    const [result, total] = await this.repo.findAndCount({
      where: { event: { id: eventId } },
      take, skip,
      relations: ['payment', 'event'],
    });
    console.log(result, total);
    return { data: result, count: total }
  }
}