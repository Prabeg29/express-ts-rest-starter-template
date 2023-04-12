import knex from '../../../../database';
import { Todo } from '@modules/todos/todo.type';
import { todosStub } from '@modules/todos/__tests__/stubs/todo.stub';
import { GetOneTodoUseCase } from '@modules/todos/use-cases/get-one-todo.use.case';
import { TodoRepositoryInterface, KnexTodoRepository } from '@modules/todos/repositories/knex-todo.repository';

jest.mock('@modules/todos/repositories/knex-todo.repository');

describe('GetOneTodoUseCase', () => {
  let getOneTodoUseCase: GetOneTodoUseCase;
  let todoRepository: TodoRepositoryInterface;
  let mockGetOne: jest.SpyInstance<Promise<Todo>, [id: number]>;
  let res: Todo;
  let error: any;

  beforeEach(() => {
    todoRepository = new KnexTodoRepository(knex);
    getOneTodoUseCase = new GetOneTodoUseCase(todoRepository);
    jest.clearAllMocks();
  });

  describe('Given, todo don\'t exists', () => {
    beforeEach(() => {
      mockGetOne = jest
        .spyOn(todoRepository, 'getOne')
        .mockImplementation(() => Promise.resolve(undefined));
    });
    describe('When getOneTodo is called', () => {
      beforeEach(async () => {
        try {
          res = await getOneTodoUseCase.execute(23);
        } catch (err) {
          error = err;
        }
      });
      it('then should throw error', () => {
        expect(error.message).toBe('Todo not found');
        expect(error.statusCode).toBe(404);
      });
    });
  });

  describe('Given, todo exists', () => {
    beforeEach(() => {
      mockGetOne = jest
        .spyOn(todoRepository, 'getOne')
        .mockImplementation(() => Promise.resolve(todosStub()[0]));
    });
    describe('When getOneTodo is called', () => {
      beforeEach(async () => {
        res = await getOneTodoUseCase.execute(todosStub()[0].id);
      });
      it('then should return the todo', () => {
        expect(res).toMatchObject(todosStub()[0]);
      });
    });
  });
});
