import { DateTime } from 'luxon';

import { PaginationInfo } from '../../../database';
import { pagination } from '@enums/pagination.enum';
import { TodoWithLabels } from '@modules/todos/todo.type';
import { getAllTodosParams } from 'modules/todos/interfaces/get-all-todos-params.interface';
import { TodoRepositoryInterface } from 'modules/todos/repositories/todo.repository.interface';

export class GetAllTodosUseCase {
  constructor(private readonly _todoRepository: TodoRepositoryInterface) {}

  public async execute({ currentPage, perPage, interval }: getAllTodosParams): Promise<{
    data: TodoWithLabels[];
    paginationInfo: PaginationInfo;
  }>{
    currentPage = Number(currentPage)|| pagination.DEFAULT_PAGE;
    perPage = Number(perPage) || pagination.DEFAULT_RECORDS_PER_PAGE;
    interval = interval || 'today';

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

    const rows =  await this._todoRepository.getAllPaginated({
      currentPage,
      perPage,
      start: intervals[interval as keyof typeof intervals]['start'],
      end  : intervals[interval as keyof typeof intervals]['end'],
    });

    const res = [];
    const todoMap = new Map();

    for (const row of rows.data) {
      const { id, title, description, dueDate, isComplete, createdAt, labelId, labelName } = row;

      if (todoMap.has(id)) {
        const todo = todoMap.get(id);
        todo.labels.push({ id: labelId, name: labelName });
      } else {
        const todo = {
          id,
          title,
          description,
          dueDate,
          isComplete,
          createdAt,
          labels: [{ id: labelId, name: labelName }],
        };
        todoMap.set(id, todo);
        res.push(todo);
      }
    }

    return { data: res, paginationInfo: rows.paginationInfo };
  }
}