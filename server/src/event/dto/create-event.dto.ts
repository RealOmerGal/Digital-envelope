import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { EventTypes } from '../event.entity';

export class CreateEventDto {
  @IsString()
  name: string;

  @Type(() => Number)
  @IsPositive()
  estimatedGuests: number;

  @IsEnum(EventTypes)
  type: EventTypes;

  @IsOptional()
  @IsBoolean()
  closed?: boolean;
}
