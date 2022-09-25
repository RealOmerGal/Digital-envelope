import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateBlessingAndPaymentDto {
  @IsString()
  createdBy: string;

  @IsString()
  text: string;

  @IsNumber()
  eventId: number;

  @Type(() => Number)
  @IsPositive()
  amount: number;

  @IsEmail()
  email: string;

  @IsString()
  token: string;
}
