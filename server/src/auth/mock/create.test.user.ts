import { genSalt, hash } from 'bcrypt';
import { random, name, image } from 'faker';
import { User } from '../../user/user.entity';

interface TestUserPartial {
  password: string;
  displayName?: string;
  profilePicture?: string;
  email?: string;
}

const userTemplate = {
  id: random.uuid(),
  email: 'test@test.com',
  displayName: name.findName(),
  profilePicture: image.avatar()
};

export const createTestUser = async (partialUser: TestUserPartial): Promise<User> => {
  const salt = await genSalt();
  return {
    ...userTemplate,
    ...partialUser,
    password: await hash(partialUser.password, salt)
  };
}