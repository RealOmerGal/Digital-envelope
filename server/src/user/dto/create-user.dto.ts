import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  id: string;

  @IsString()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  photoUrl: string

}
