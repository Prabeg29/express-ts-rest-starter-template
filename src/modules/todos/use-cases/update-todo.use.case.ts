import { TodoInput } from '../todo.type';
import { TodoRepositoryInterface } from '../knex-todo.repository';

export class UpdateTodoUseCase {
  constructor(private readonly _todoRepository: TodoRepositoryInterface) {}

  public async execute(id: number, todoInput: TodoInput): Promise<number> {
    const todo =  await this._todoRepository.getOne(id);

    if (!todo) {
      const [todoId] = await this._todoRepository.create(todoInput);

      return todoId;
    }

    if (await this._todoRepository.update(todo.id, todoInput)) {
      return todo.id;
    }
  }
}
