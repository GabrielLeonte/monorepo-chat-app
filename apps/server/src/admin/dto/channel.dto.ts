import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelRequest {
  @ApiProperty({ default: 'general' })
  name: string;
}
