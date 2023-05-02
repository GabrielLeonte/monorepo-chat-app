import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequest {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class RegisterResponse {
  @ApiProperty()
  token: string;
}
