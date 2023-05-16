import { DateTime } from 'luxon';

import { Todo } from '@modules/todos/todo.type';
import { PaginationInfo } from '../../../database';
import { pagination } from '@enums/pagination.enum';
import { getAllTodosParams } from 'modules/todos/interfaces/get-all-todos-params.interface';
import { TodoRepositoryInterface } from 'modules/todos/repositories/todo.repository.interface';

export class GetAllTodosUseCase {
  constructor(private readonly _todoRepository: TodoRepositoryInterface) {}

  public async execute({ currentPage, perPage, interval }: getAllTodosParams): Promise<{
    data: Todo[];
    paginationInfo: PaginationInfo;
  }>{
    const currentPageNumber = !isNaN(Number(currentPage)) ? Number(currentPage) : pagination.DEFAULT_PAGE;
    const perPageNumber = !isNaN(Number(currentPage)) ? Number(perPage) : pagination.DEFAULT_RECORDS_PER_PAGE;

    const now = DateTime.local();

    const intervals = {
      'today': {
        'start': `${now.toISODate()} 00:00:00`,
        'end'  : `${now.toISODate()} 23:59:59`
      },
      'week': {
        'start': `${now.startOf('week').minus({day: 1}).toSQL({ includeOffset: false })}`,
        'end'  : `${now.endOf('week').minus({day: 1}).toSQL({ includeOffset: false })}`
      },
      'month': {
        'start': `${now.startOf('month').toSQL({ includeOffset: false })}`,
        'end'  : `${now.endOf('month').toSQL({ includeOffset: false })}`
      }
    };

    return await this._todoRepository.getAllPaginated({
      currentPage: currentPageNumber,
      perPage    : perPageNumber,
      start      : intervals[interval as keyof typeof intervals]['start'],
      end        : intervals[interval as keyof typeof intervals]['end'] 
    });
  }
}