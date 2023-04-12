import { StatusCodes } from 'http-status-codes';

import { HttpException } from '@exceptions/http.exception';
import { TodoRepositoryInterface } from '@modules/todos/repositories/knex-todo.repository';

export class DeleteTodoUseCase {
  constructor(private readonly _todoRepository: TodoRepositoryInterface) {}

  public async execute(id: number): Promise<boolean> {
    const todo =  await this._todoRepository.getOne(id);

    if (!todo) {
      throw new HttpException('Todo not found', StatusCodes.NOT_FOUND);
    }

    const result = await this._todoRepository.delete(todo.id);

    if (!result) {
      throw new Error('Todo not deleted');
    }

    return true;
  }
}
