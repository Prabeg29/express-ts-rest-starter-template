import knex from '../../../../database';
import { todosStub } from '@modules/todos/__tests__/stubs/todo.stub';
import { CreateTodoUseCase } from '@modules/todos/use-cases/create-todo.use-case';
import { TodoRepositoryInterface, KnexTodoRepository } from '@modules/todos/repositories/knex-todo.repository';

jest.mock('@modules/todos/repositories/knex-todo.repository');

describe('CreateTodoUseCase', () => {
  let createTodoUseCase: CreateTodoUseCase;
  let todoRepository: TodoRepositoryInterface;
  let res: number;

  beforeEach(() => {
    todoRepository = new KnexTodoRepository(knex);
    createTodoUseCase = new CreateTodoUseCase(todoRepository);
    jest.clearAllMocks();
  });

  describe('Given, todo don\'t exists', () => {
    beforeEach(() => {});
    describe('When createTodo is called', () => {
      beforeEach(async () => {
        res = await createTodoUseCase.execute({
          'title'      : todosStub()[0].title,
          'description': todosStub()[0].description,
          'isComplete' : todosStub()[0].isComplete,
          'dueDate'    : todosStub()[0].dueDate
        });
      });
      it('then should return the id of newly created todo', () => {
        expect(res).toBe(todosStub()[0].id);
      });
    });
  });
});
