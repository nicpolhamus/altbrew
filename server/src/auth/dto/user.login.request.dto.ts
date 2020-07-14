import { ApiProperty } from "@nestjs/swagger";

export class UserLoginRequestDto {
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly password: string;
}