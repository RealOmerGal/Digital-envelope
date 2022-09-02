import {
  Injectable,
  BadRequestException,
  Inject,
  Logger,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async googleAuth(req): Promise<User> {
    //Check if user already exists
    const user = await this.usersService.findById(req.user.id);
    if (user) {
      return user;
    }

    //Else, sign up a new user
    return this.usersService.create(req.user);
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
}
