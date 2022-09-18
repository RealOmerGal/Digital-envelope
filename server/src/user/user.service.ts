import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    const user = this.repo.create(createUserDto);
    return this.repo.save(user);
  }
  async findById(id: string) {
    return await this.repo.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return await this.repo.findOne({ where: { email } });
  }

  async update(updateUserDto: UpdateUserDto) {
    const user = await this.findById(updateUserDto.id);
    Object.assign(user, updateUserDto);
    return this.repo.save(user);
  }
}
