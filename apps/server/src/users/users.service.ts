import { FindOneOptions, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Users } from './entities/users.entity';

import { PasetoService } from 'src/paseto/paseto.service';

import { RegisterRequest, RegisterResponse } from './dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly pasetoService: PasetoService
  ) {}

  // this is not something very common, usually dedicated functions are the way to go into other porjects,
  // but I like to be able to do whatever query I want in the users table from anywhere across the project
  // while mentaining the flexibility
  public findOne(options: FindOneOptions<Users>): Promise<Users> {
    return this.usersRepository.findOne(options);
  }

  public async getUUIDByUsername(username: string): Promise<string> {
    const user = await this.usersRepository.findOne({
      select: { uuid: true },
      where: { username },
    });

    return user ? user.uuid : null;
  }

  public async register(payload: RegisterRequest): Promise<RegisterResponse> {
    const { username, password } = payload;

    const alreadyExists = await this.usersRepository.count({
      where: { username },
    });

    if (alreadyExists != 0) throw new Error('This user already exists :(');

    const user = this.usersRepository.create({ username, password });

    await this.usersRepository.save(user);

    const token = await this.pasetoService.sign(user.uuid);

    return {
      token,
    };
  }
}
