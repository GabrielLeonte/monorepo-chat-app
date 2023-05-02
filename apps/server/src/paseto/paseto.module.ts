import { Global, Module } from '@nestjs/common';

import { PasetoService } from './paseto.service';
import { UsersModule } from 'src/users/users.module';

@Global()
@Module({
  imports: [UsersModule],
  providers: [PasetoService],
  exports: [PasetoService],
})
export class PasetoModule {}
