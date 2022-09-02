import { Expose, Transform } from 'class-transformer';

export class BlessingDto {
  @Expose()
  createdBy: string;

  @Expose()
  text: string;

  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Transform(({ obj }) => obj.event.id)
  @Expose()
  eventId: number;

  @Transform(({ obj }) => obj.payment.amount)
  @Expose()
  paymentAmount: number;
}
