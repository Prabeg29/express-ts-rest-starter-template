import config from '@config';
import { Todo, TodoDto, TodoDtoCollection } from '@modules/todos/todo.type';

export default class TodoMapper {
  public static toDto(todo: Todo): TodoDto {
    return {
      id        : todo.id,
      attributes: {
        title      : todo.title,
        description: todo.description,
        isComplete : todo.isComplete,
        dueDate    : todo.dueDate?.toDateString(),
        createdAt  : todo.createdAt.toDateString(),
        updatedAt  : todo.updatedAt.toDateString(),
      },
      meta: {
        link: new URL(`${config.app.url}/api/todos/${todo.id}`),
      }
    };
  }

  public static toDtoCollection(todos: Todo[]): TodoDtoCollection {
    return todos.map(todo => TodoMapper.toDto(todo));
  }
}
