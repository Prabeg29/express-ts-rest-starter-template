import knex from '../../../../database';
import { Todo } from '@modules/todos/todo.type';
import { todosStub } from '@modules/todos/__tests__/stubs/todo.stub';
import { UpdateTodoUseCase } from '@modules/todos/use-cases/update-todo.use.case';
import { TodoRepositoryInterface, KnexTodoRepository } from '@modules/todos/repositories/knex-todo.repository';

jest.mock('@modules/todos/repositories/knex-todo.repository');

describe('UpdateTodoUseCase', () => {
  let updateTodoUseCase: UpdateTodoUseCase;
  let todoRepository: TodoRepositoryInterface;
  let mockGetOne: jest.SpyInstance<Promise<Todo>, [id: number]>;
  let res: number;

  beforeEach(() => {
    todoRepository = new KnexTodoRepository(knex);
    updateTodoUseCase = new UpdateTodoUseCase(todoRepository);
    jest.clearAllMocks();
  });

  describe('Given, todo doesn\'t exists', () => {
    beforeEach(() => {
      mockGetOne = jest
        .spyOn(todoRepository, 'getOne')
        .mockImplementation(() => Promise.resolve(undefined));
    });
    describe('When updateTodo is called', () => {
      beforeEach(async () => {
        res = await updateTodoUseCase.execute(todosStub()[0].id, {
          'title'      : todosStub()[0].title,
          'description': todosStub()[0].description,
          'isComplete' : todosStub()[0].isComplete,
          'dueDate'    : todosStub()[0].dueDate
        });
      });
      it.skip('then should return the id of newly created todo', () => {
        expect(res).toBe(todosStub()[0].id);
      });
    });
  });

  describe('Given, todo exists', () => {
    beforeEach(() => {
      mockGetOne = jest
        .spyOn(todoRepository, 'getOne')
        .mockImplementation(() => Promise.resolve(todosStub()[0]));
    });
    describe('When updateTodo is called', () => {
      beforeEach(async () => {
        res = await updateTodoUseCase.execute(todosStub()[0].id,{
          'title'      : todosStub()[0].title,
          'description': todosStub()[0].description,
          'isComplete' : todosStub()[0].isComplete,
          'dueDate'    : todosStub()[0].dueDate
        });
      });
      it.skip('then should return the id of updated todo', () => {
        expect(res).toBe(todosStub()[0].id);
      });
    });
  });
});
