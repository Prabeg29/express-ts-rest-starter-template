import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import TodoMapper from '@modules/todos/todo.mapper';
import { pagination } from '@enums/pagination.enum';
import { TodoRepositoryInterface } from '@modules/todos/repositories/todo.repository.interface';

export class GetAllTodosController {
  constructor(private readonly _todoRepository: TodoRepositoryInterface) {}

  public execute = async (
    req: Request<unknown, unknown, unknown, {currentPage: string; perPage: string;}>, res: Response
  ): Promise<void> => {
    const { currentPage, perPage } = req.query;

    const currentPageNumber = currentPage ? Number(currentPage) : pagination.DEFAULT_PAGE;
    const perPageNumber = perPage ? Number(perPage) : pagination.DEFAULT_RECORDS_PER_PAGE;

    const { data: todos, paginationInfo } = await this._todoRepository.getAllPaginated(
      currentPageNumber, perPageNumber
    );

    res.status(StatusCodes.OK).json({ 
      meta: {
        paginationInfo: paginationInfo
      },
      todos: TodoMapper.toDtoCollection(todos),
    });
  };
}
