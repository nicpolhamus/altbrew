import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  displayName?: string;
  @ApiProperty()
  profilePicture?: Buffer;
}