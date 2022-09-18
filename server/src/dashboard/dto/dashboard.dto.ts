import { Expose, Transform } from 'class-transformer';

export class DashboardDto {
  @Expose()
  paidGuests: {
    current: number;
    max: number;
  };


  @Expose()
  averagePerGuest: {
    avg: number,
    comaredToSimilar: number
  };

  @Transform(({ obj }) => obj.totalAmount.sum)
  @Expose()
  totalAmount: number;

  @Expose()
  amountDistribution: Array<{ count: number; amount: number }>;
}
