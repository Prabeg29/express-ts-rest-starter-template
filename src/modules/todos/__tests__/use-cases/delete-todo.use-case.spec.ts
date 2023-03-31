import knex from '../../../../database';
import { Todo } from '@modules/todos/todo.type';
import { todosStub } from '@modules/todos/__tests__/stubs/todo.stub';
import { DeleteTodoUseCase } from '@modules/todos/use-cases/delete-todo.use.case';
import { TodoRepositoryInterface, KnexTodoRepository } from '@modules/todos/knex-todo.repository';

jest.mock('@modules/todos/knex-todo.repository');

describe('DeleteTodoUseCase', () => {
  let deleteTodoUseCase: DeleteTodoUseCase;
  let todoRepository: TodoRepositoryInterface;
  let mockGetOne: jest.SpyInstance<Promise<Todo>, [id: number]>;
  let res: boolean;
  let error: any;

  beforeEach(() => {
    todoRepository = new KnexTodoRepository(knex);
    deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);
    jest.clearAllMocks();
  });

  describe('Given, todo doesn\'t exists', () => {
    beforeEach(() => {
      mockGetOne = jest
        .spyOn(todoRepository, 'getOne')
        .mockImplementation(() => Promise.resolve(undefined));
    });
    describe('When deleteTodo is called', () => {
      beforeEach(async () => {
        try {
          res = await deleteTodoUseCase.execute(23);
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
        res = await deleteTodoUseCase.execute(todosStub()[0].id);
      });
      it('then should delete the todo', () => {
        expect(res).toEqual(true);
      });
    });
  });
});
