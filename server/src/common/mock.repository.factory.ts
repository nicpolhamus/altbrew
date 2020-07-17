import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

// @ts-ignore
export const mockRepositoryFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  create: jest.fn(entity => entity),
  save: jest.fn(entity => entity),
  findOne: jest.fn(entity => entity),
  find: jest.fn(entity => entity),
  softDelete: jest.fn(() => null)
}));