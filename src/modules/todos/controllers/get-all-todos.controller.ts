import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import TodoMapper from '@modules/todos/todo.mapper';
import { GetAllTodosUseCase } from '@modules/todos/use-cases/get-all-todos.use-case';
import { getAllTodosParams } from '@modules/todos/interfaces/get-all-todos-params.interface';

export class GetAllTodosController {
  constructor(private readonly _getAllTodosUseCase: GetAllTodosUseCase) {}

  public execute = async (
    req: Request<unknown, unknown, unknown, getAllTodosParams>, res: Response
  ): Promise<void> => {
    const { currentPage, perPage, interval } = req.query;

    const { data: todos, paginationInfo } = await this._getAllTodosUseCase.execute({
      currentPage: String(currentPage),
      perPage    : String(perPage),
      interval   : interval
    });

    res.status(StatusCodes.OK).json({ 
      meta: {
        paginationInfo: paginationInfo
      },
      todos: TodoMapper.toDtoCollection(todos),
    });
  };
}
