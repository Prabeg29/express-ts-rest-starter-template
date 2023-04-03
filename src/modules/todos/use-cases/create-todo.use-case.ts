import { TodoInput } from '../todo.type';
import { TodoRepositoryInterface } from '../repositories/knex-todo.repository';

export class CreateTodoUseCase {
  constructor(private readonly _todoRepository: TodoRepositoryInterface) {}

  public async execute (todo: TodoInput): Promise<number> {
    const [todoId] = await this._todoRepository.create(todo);
    
    return todoId;
  }
}
