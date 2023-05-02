import { ApiProperty } from '@nestjs/swagger';

export class GetChannelsResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
