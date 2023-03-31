import { Todo } from '@modules/todos/todo.type';
import { TodoRepositoryInterface } from '@modules/todos/knex-todo.repository';

export class GetAllTodosUseCase {
  constructor(private readonly _todoRepository: TodoRepositoryInterface) {}

  public async execute (): Promise<Array<Todo>> {
    return await this._todoRepository.getAll();
  }
}
