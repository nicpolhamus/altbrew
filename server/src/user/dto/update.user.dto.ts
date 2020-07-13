export interface UpdateUserDto {
  email: string;
  displayName?: string;
  profilePicture?: Buffer;
}