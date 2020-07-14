import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export class UserDto {
  constructor(user: UserDto | User) {
    this.id = user.id;
    this.email = user.email;
    this.displayName = user.displayName;
  }

  @ApiProperty()
  email: string;
  @ApiProperty()
  displayName: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  profilePicture?: string;
}