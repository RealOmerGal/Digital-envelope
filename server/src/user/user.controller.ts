import { Controller, Post, Body, Patch, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Patch()
  async update(@Body() updatedUserDto: UpdateUserDto, @Session() session: any) {
    const updatedUser = await this.userService.update(updatedUserDto);
    session.user = updatedUser;
    return updatedUser;
  }
}
