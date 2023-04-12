import knex, { PaginationInfo } from '../../../../database';
import { Todo } from '@modules/todos/todo.type';
import { todosStub } from '@modules/todos/__tests__/stubs/todo.stub';
import { GetAllTodosUseCase } from '@modules/todos/use-cases/get-all-todos.use-case';
import { TodoRepositoryInterface, KnexTodoRepository } from '@modules/todos/repositories/knex-todo.repository';

jest.mock('@modules/todos/repositories/knex-todo.repository');

describe('GetAllTodosUseCase', () => {
  let getAllTodosUseCase: GetAllTodosUseCase;
  let todoRepository: TodoRepositoryInterface;
  let mockGetAll: jest.SpyInstance<Promise<{
    data: Todo[];
    paginationInfo: PaginationInfo;
  }>>;
  let res: { data: Todo[]; paginationInfo: PaginationInfo; };

  beforeEach(() => {
    todoRepository = new KnexTodoRepository(knex);
    getAllTodosUseCase = new GetAllTodosUseCase(todoRepository);
    jest.clearAllMocks();
  });

  describe('Given, todos exists', () => {
    beforeEach(() => {
      mockGetAll = jest
        .spyOn(todoRepository, 'getAllPaginated')
        .mockImplementation(() => Promise.resolve({
          data          : todosStub(),
          paginationInfo: {
            'total'      : 1,
            'perPage'    : 25,
            'currentPage': 1,
            'lastPage'   : 1,
            'prevPage'   : null,
            'nextPage'   : null}
        }));
    });
    describe('When getAllTodo is called', () => {
      beforeEach(async () => {
        res = await getAllTodosUseCase.execute('1', '25');
      });
      it('then should return arrays of todos', () => {
        expect(res).toMatchObject({
          data          : todosStub(),
          paginationInfo: {
            'total'      : 1,
            'perPage'    : 25,
            'currentPage': 1,
            'lastPage'   : 1,
            'prevPage'   : null,
            'nextPage'   : null}
        });
      });
    });
  });
});
