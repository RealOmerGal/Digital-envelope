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

  @Transform(({ obj }) => obj.payment.amount)
  @Expose()
  amount: number;
}
