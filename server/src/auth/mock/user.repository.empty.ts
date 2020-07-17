import { MockType } from '../../common/mock.repository.factory';
import { Repository } from 'typeorm';
import { User } from '../../user/user.entity';

export const userRepositoryEmpty = async (mockRepo: MockType<Repository<User>>, test: () => Promise<void>) => {
  mockRepo.findOne.mockImplementation(_ => null);
  await test();
  mockRepo.save.mockReset();
}