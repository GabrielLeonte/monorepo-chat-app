import { compareSync } from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { PasetoService } from 'src/paseto/paseto.service';

import { encryptSymetrical } from 'src/utils/encryption';

import { LoginRequest, LoginResponse } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly pasetoService: PasetoService) {}

  public async login(loginData: LoginRequest): Promise<LoginResponse> {
    const { username, password } = loginData;

    const user = await this.usersService.findOne({
      select: { uuid: true, password: true },
      where: { username: encryptSymetrical(username) },
    });

    if (!user) throw new Error("This user doesn't exist");

    const isSamePassword = compareSync(password, user.password);

    if (!isSamePassword) throw new Error('Wrong password.');

    const token = await this.pasetoService.sign(user.uuid);

    return {
      token,
    };
  }
}
