import { StatusCodes } from 'http-status-codes';

import { Todo } from '@modules/todos/todo.type';
import { HttpException } from '@exceptions/http.exception';
import { TodoRepositoryInterface } from '@modules/todos/repositories/knex-todo.repository';

export class GetOneTodoUseCase {
  constructor(private readonly _todoRepository: TodoRepositoryInterface) {}

  public async execute(id: number): Promise<Todo> {
    const todo =  await this._todoRepository.getOne(id);

    if (!todo) {
      throw new HttpException('Todo not found', StatusCodes.NOT_FOUND);
    }

    return todo;
  }
}
