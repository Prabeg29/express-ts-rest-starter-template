import knex from '../../../../database';
import { Todo } from '@modules/todos/todo.type';
import { todosStub } from '@modules/todos/__tests__/stubs/todo.stub';
import { GetAllTodosUseCase } from '@modules/todos/use-cases/get-all-todos.use-case';
import { TodoRepositoryInterface, KnexTodoRepository } from '@modules/todos/knex-todo.repository';

jest.mock('@modules/todos/knex-todo.repository');

describe('GetAllTodosUseCase', () => {
  let getAllTodosUseCase: GetAllTodosUseCase;
  let todoRepository: TodoRepositoryInterface;
  let mockGetAll: jest.SpyInstance<Promise<Todo[]>>;
  let res: Todo[];

  beforeEach(() => {
    todoRepository = new KnexTodoRepository(knex);
    getAllTodosUseCase = new GetAllTodosUseCase(todoRepository);
    jest.clearAllMocks();
  });

  describe('Given, todos exists', () => {
    beforeEach(() => {
      mockGetAll = jest
        .spyOn(todoRepository, 'getAll')
        .mockImplementation(() => Promise.resolve(todosStub()));
    });
    describe('When getAllTodo is called', () => {
      beforeEach(async () => {
        res = await getAllTodosUseCase.execute();
      });
      it('then should return arrays of todos', () => {
        expect(res).toMatchObject(todosStub());
      });
    });
  });
});
