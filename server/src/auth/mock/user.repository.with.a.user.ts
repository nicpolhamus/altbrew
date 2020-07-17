import { Repository } from 'typeorm';
import { MockType } from '../../common/mock.repository.factory';
import { User } from '../../user/user.entity';

export const userRepoWithUser = async (mockRepo: MockType<Repository<User>>, user: User, test: () => Promise<void>) => {
  mockRepo.findOne.mockImplementation(_ => user);
  await test();
  mockRepo.save.mockReset();
};