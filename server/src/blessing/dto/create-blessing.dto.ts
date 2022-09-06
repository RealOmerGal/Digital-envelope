import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateBlessingDto {
  @IsString()
  createdBy: string;

  @IsString()
  text: string;

  @IsNumber()
  eventId: number;

  @Type(() => Number)
  @IsPositive()
  amount: number
}
