import { Todo } from '@modules/todos/todo.type';
import { PaginationInfo } from '../../../database';
import { pagination } from '@enums/pagination.enum';
import { TodoRepositoryInterface } from '@modules/todos/repositories/todo.repository.interface';

export class GetAllTodosUseCase {
  constructor(private readonly _todoRepository: TodoRepositoryInterface) {}

  public async execute (currentPage: string, perPage: string): Promise<{
    data: Todo[];
    paginationInfo: PaginationInfo; 
  }> {
    const currentPageAsNumber = currentPage ? Number(currentPage) : pagination.DEFAULT_PAGE;
    const perPageAsNumber = perPage ? Number(perPage) : pagination.DEFAULT_RECORDS_PER_PAGE;

    return await this._todoRepository.getAllPaginated(currentPageAsNumber, perPageAsNumber);
  }
}
