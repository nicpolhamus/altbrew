import { Repository } from 'typeorm';
import { MockType } from '../../common/mock.repository.factory';
import { User } from '../user.entity';

export const userRepositoryConflicts = async (mockRepo: MockType<Repository<User>>, test: () => Promise<void>) => {
  const RepositoryContraintException = {
    original: {constraint: 'user_email_key'},
    errors: [{value: ''}]
  };
  mockRepo.save.mockImplementation(_ => { throw RepositoryContraintException; });
  await test();
  mockRepo.save.mockReset();
};