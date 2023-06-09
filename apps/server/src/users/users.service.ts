import { FindOneOptions, FindOptionsSelect, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Users } from './entities/users.entity';

import { RegisterRequest } from './dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) {}

  // this is not something very common, usually dedicated functions are the way to go into other porjects,
  // but I like to be able to do whatever query I want in the users table from anywhere across the project
  // while mentaining the flexibility
  public findOne(options: FindOneOptions<Users>): Promise<Users> {
    return this.usersRepository.findOne(options);
  }

  public findAll(select: FindOptionsSelect<Users>): Promise<Array<Users>> {
    return this.usersRepository.find({ select });
  }

  public async getUUIDByUsername(username: string): Promise<string> {
    const user = await this.usersRepository.findOne({
      select: { uuid: true },
      where: { username },
    });

    return user ? user.uuid : null;
  }

  public async register(payload: RegisterRequest): Promise<void> {
    const { username, password } = payload;

    const alreadyExists = await this.usersRepository.count({
      where: { username },
    });

    if (alreadyExists != 0) throw new HttpException('This user already exists :(', HttpStatus.CONFLICT);

    const user = this.usersRepository.create({ username, password });

    await this.usersRepository.save(user);
  }
}
