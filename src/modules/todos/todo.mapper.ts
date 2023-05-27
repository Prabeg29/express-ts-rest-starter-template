import config from '@config';
import LabelMapper from '@modules/labels/label.mapper';
import { TodoDto, TodoDtoCollection, TodoWithLabels } from '@modules/todos/todo.type';

export default class TodoMapper {
  public static toDto(todo: TodoWithLabels): TodoDto {
    return {
      id        : todo.id,
      attributes: {
        title      : todo.title,
        description: todo.description,
        isComplete : todo.isComplete,
        dueDate    : todo.dueDate?.toDateString(),
        createdAt  : todo.createdAt.toDateString(),
      },
      relationships: {
        labels: LabelMapper.toDtoCollection(todo.labels)
      }
    };
  }

  public static toDtoCollection(todos: TodoWithLabels[]): TodoDtoCollection {
    return todos.map(todo => {
      return {
        ...TodoMapper.toDto(todo),
        meta: {
          link: new URL(`${config.app.url}/api/todos/${todo.id}`),
        }
      };
    });
  }
}
