import { ApiProperty } from '@nestjs/swagger';

export class UserLoginResponseDto {
  @ApiProperty()
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}