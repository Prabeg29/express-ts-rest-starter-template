import { DateTime } from 'luxon';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Todo } from '@modules/todos/todo.type';
import { PaginationInfo } from '../../../database';
import TodoMapper from '@modules/todos/todo.mapper';
import { pagination } from '@enums/pagination.enum';
import { TodoRepositoryInterface } from '../repositories/todo.repository.interface';
import { getAllTodosParams } from '@modules/todos/interfaces/get-all-todos-params.interface';

export class GetAllTodosController {
  constructor(private readonly _todoRepository: TodoRepositoryInterface) {}

  public execute = async (
    req: Request<unknown, unknown, unknown, getAllTodosParams>, res: Response
  ): Promise<void> => {
    const { currentPage, perPage, start, end } = this.getFilterOptions(req.query as getAllTodosParams);
    const rows =  await this._todoRepository.getAllPaginated({ currentPage, perPage, start, end });
    const { data: todos, paginationInfo } = this.mapLabelsToTodos(rows);

    res.status(StatusCodes.OK).json({ 
      meta: {
        paginationInfo: paginationInfo
      },
      todos: TodoMapper.toDtoCollection(todos),
    });
  };

  private getFilterOptions = ({ currentPage, perPage, interval }: getAllTodosParams ) => {
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

    return { 
      currentPage,
      perPage,
      start: intervals[interval as keyof typeof intervals]['start'],
      end  : intervals[interval as keyof typeof intervals]['end'], 
    };
  };

  private mapLabelsToTodos = (rows: {
    data: (Todo & {
        labelId: number;
        labelName: string;
    })[];
    paginationInfo: PaginationInfo;
  }) => {
    const res = [];
    const todoMap = new Map();

    for (const row of rows.data) {
      const { id, title, description, dueDate, isComplete, createdAt, labelId, labelName } = row;

      const label = labelId && labelName ? { id: labelId, name: labelName} : null; 

      if (todoMap.has(id)) {
        const todo = todoMap.get(id);
        if (label) {
          todo.labels.push(label);
        }
      } else {
        const todo = {
          id,
          title,
          description,
          dueDate,
          isComplete,
          createdAt,
          labels: label ? [label] : [] 
        };

        todoMap.set(id, todo);
        res.push(todo);
      }
    }

    return { data: res, paginationInfo: rows.paginationInfo };
  };
}
