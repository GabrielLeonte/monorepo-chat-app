import { V4 } from 'paseto';
import { Injectable } from '@nestjs/common';

const { PASETO } = process.env;
const { privateKey, expiresIn } = JSON.parse(PASETO);

const { sign, verify } = V4;

@Injectable()
export class PasetoService {
  public async sign(uuid: string): Promise<string> {
    return sign({ uuid }, privateKey, { expiresIn });
  }

  public async verify(token: string) {
    const user = await verify(token, privateKey);

    console.log(user);
  }
}
