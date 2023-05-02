import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { PasetoService } from 'src/paseto/paseto.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(PasetoService) private pasetoService: PasetoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization) throw new UnauthorizedException();

    const token: string = authorization.split(' ').pop();
    const user = await this.pasetoService.verify(token);

    if (!user) throw new UnauthorizedException();

    request.user = user;

    return true;
  }
}
