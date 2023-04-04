import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import TodoMapper from '@modules/todos/todo.mapper';
import { TodoInput } from '@modules/todos/todo.type';
import { CreateTodoUseCase } from '@modules/todos/use-cases/create-todo.use-case';
import { DeleteTodoUseCase } from '@modules/todos/use-cases/delete-todo.use.case';
import { UpdateTodoUseCase } from '@modules/todos/use-cases/update-todo.use.case';
import { GetOneTodoUseCase } from '@modules/todos/use-cases/get-one-todo.use.case';
import { GetAllTodosUseCase } from '@modules/todos/use-cases/get-all-todos.use-case';

export class TodoController {
  constructor(
    private readonly _getAllTodosUseCase: GetAllTodosUseCase,
    private readonly _createTodoUseCase: CreateTodoUseCase,
    private readonly _getOneTodoUseCase: GetOneTodoUseCase,
    private readonly _updateTodoUseCase: UpdateTodoUseCase,
    private readonly _deleteTodoUseCase: DeleteTodoUseCase,
  ) {}

  /**
   * Fetch all the resources
   */
  public index = async (
    req: Request<unknown, unknown, unknown, {currentPage: string; perPage: string;}>, res: Response, next: NextFunction
  ): Promise<void> => {
    try {
      const { currentPage, perPage } = req.query;
      const { data: todos, paginationInfo } = await this._getAllTodosUseCase.execute(currentPage, perPage);

      res.status(StatusCodes.OK).json({ 
        meta: {
          paginationInfo: paginationInfo
        },
        todos: TodoMapper.toDtoCollection(todos),
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Save a new resource to the storage
   */
  public store = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const todoId: number = await this._createTodoUseCase.execute(req.body as TodoInput);
      const todo = await this._getOneTodoUseCase.execute(todoId);
  
      res.status(StatusCodes.CREATED).json({ data: TodoMapper.toDto(todo) });
    } catch (err) {
      next(err);
    }
  };
  
  /**
   * Fetch the resource referenced by the identifier 
   */
  public show  = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const todo = await this._getOneTodoUseCase.execute(parseInt(req.params.id));

      res.status(StatusCodes.OK).json({ data: TodoMapper.toDto(todo) });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Update the resource referenced by the identifier 
   */
  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const todoId = await this._updateTodoUseCase.execute(parseInt(req.params.id), req.body as TodoInput);
      const todo = await this._getOneTodoUseCase.execute(todoId);

      res.status(StatusCodes.OK).json({ data: TodoMapper.toDto(todo) });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Remove the resource referenced by the identifier from the storage
   */
  public destroy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this._deleteTodoUseCase.execute(parseInt(req.params.id));

      res.status(StatusCodes.OK).json({ message: 'Todo deleted' });
    } catch (err) {
      next(err);
    }
  };
}
