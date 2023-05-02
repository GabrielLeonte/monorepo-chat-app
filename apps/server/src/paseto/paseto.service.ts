import { V4 } from 'paseto';
import { Injectable } from '@nestjs/common';

import { Users } from 'src/users/entities/users.entity';

import { UsersService } from 'src/users/users.service';

type PasetoTokenPayload = {
  uuid: string;
};

const { PASETO } = process.env;
const { privateKey, expiresIn } = JSON.parse(PASETO);

const { sign, verify } = V4;

@Injectable()
export class PasetoService {
  constructor(private readonly usersService: UsersService) {}

  public async sign(uuid: string): Promise<string> {
    return sign({ uuid }, privateKey, { expiresIn });
  }

  public async verify(token: string): Promise<Users> {
    const { uuid } = await verify<PasetoTokenPayload>(token, privateKey);

    const user = await this.usersService.findOne({
      select: { id: true },
      where: { uuid },
    });

    return user;
  }
}
