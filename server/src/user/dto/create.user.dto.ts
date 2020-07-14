import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  displayName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}