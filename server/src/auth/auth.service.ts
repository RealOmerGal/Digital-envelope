import {
  Injectable
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';


@Injectable()
export class AuthService {
  constructor(private usersService: UserService) { }

  async googleAuth(req): Promise<User> {
    //Check if user already exists
    const user = await this.usersService.findById(req.user.id);
    if (user) {
      return user;
    }

    //Else, sign up a new user
    return this.usersService.create(req.user);
  }

}
