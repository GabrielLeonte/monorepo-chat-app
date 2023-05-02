import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelRequest {
  @ApiProperty()
  name: string;
}
