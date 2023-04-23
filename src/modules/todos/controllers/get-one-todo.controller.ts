import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import TodoMapper from '@modules/todos/todo.mapper';
import { HttpException } from '@exceptions/http.exception';
import { TodoRepositoryInterface } from '@modules/todos/repositories/todo.repository.interface';

export class GetOneTodoController {
  constructor(private readonly _todoRepository: TodoRepositoryInterface) {}

  public execute  = async (req: Request, res: Response): Promise<void> => {
    const todo =  await this._todoRepository.getOne(parseInt(req.params.id));

    if (!todo) {
      throw new HttpException('Todo not found', StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json({ todo: TodoMapper.toDto(todo) });
  };
}
