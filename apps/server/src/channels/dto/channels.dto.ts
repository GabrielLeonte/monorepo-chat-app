import { ApiProperty } from '@nestjs/swagger';

export class GetChannelsResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

export class GetChannelsDataResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  messageSentTotal: number;

  @ApiProperty()
  messageSent5Min: number;

  @ApiProperty()
  messages: Array<unknown>;

  @ApiProperty()
  users: Array<unknown>;
}
