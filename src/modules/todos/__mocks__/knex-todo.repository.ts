import { todosStub } from '../__tests__/stubs/todo.stub';

export const KnexTodoRepository = jest.fn().mockImplementation(() => {
  return {
    getOne: jest.fn(),
    getAll: jest.fn(),
    create: jest.fn().mockResolvedValue([todosStub()[0].id]),
    update: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue(true),
  };
});