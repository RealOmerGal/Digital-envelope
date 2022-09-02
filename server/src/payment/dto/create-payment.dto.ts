import { Type } from "class-transformer";
import { IsPositive } from "class-validator";

export class CreatePaymentDto {
    @Type(() => Number)
    @IsPositive()
    total: number
}