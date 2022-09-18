import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Blessing } from './blessing.entity';
import { BadRequestException } from '@nestjs/common';
import { EventService } from '../event/event.service';
import { PaymentService } from '../payment/payment.service';
import { CreateBlessingAndPaymentDto } from './dto/create-blessing.dto';

@Injectable()
export class BlessingService {
  constructor(
    @InjectRepository(Blessing) private repo: Repository<Blessing>,
    private eventService: EventService,
    private paymentService: PaymentService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async create(dto: CreateBlessingAndPaymentDto) {
    const event = await this.eventService.findOne(dto.eventId);
    if (event.closed) throw new BadRequestException('Event is closed');

    //Need to save blessing and pamyment in a tansaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //Find the payment profile for the event's user
      const paymentProfileId = await this.getPaymentProfileForEvent(
        dto.eventId,
      );
      const payment = await this.paymentService.create(
        dto.amount,
        dto.token,
        dto.email,
        paymentProfileId,
      );

      const blessing = this.repo.create({
        event: { id: dto.eventId },
        payment: { id: payment.entity.id },
        createdBy: dto.createdBy,
        text: dto.text,
      });
      await this.repo.save(blessing);
      await queryRunner;
      return payment.stripe;
    } catch (e) {
      queryRunner.rollbackTransaction();
      throw new Error(e);
    } finally {
      await queryRunner.release();
    }
  }

  async findByEvent(eventId: number, take: number, skip: number) {
    const [result, total] = await this.repo.findAndCount({
      where: { event: { id: eventId } },
      take,
      skip,
      relations: {
        payment: true,
      },
      cache: 60000,
    });
    return { total, result };
  }

  //TODO: check if public schema prefix is needed rn
  async getPaymentProfileForEvent(eventId: number) {
    const res = await this.dataSource.query(
      `
   SELECT public.user."paymentProfileId" 
   FROM public.event
   INNER JOIN public.user
   ON public.user.id = public.event."userId"
   WHERE public.event.id = $1`,
      [eventId],
    );
    return res[0].paymentProfileId;
  }
}
