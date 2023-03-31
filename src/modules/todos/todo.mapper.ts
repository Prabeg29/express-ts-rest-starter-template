import { Todo, TodoDto, TodoDtoCollection, TodoInput } from '@modules/todos/todo.type';

export default class TodoMapper {
  public static toDomain(payload: any): TodoInput {
    return {
      title      : payload.title,
      description: payload.description,
      isComplete : payload.isComplete,
    };
  }

  public static toDto(todo: Todo): TodoDto {
    return {
      id        : todo.id,
      attributes: {
        title      : todo.title,
        description: todo.description,
        isComplete : todo.isComplete,
        createdAt  : todo.createdAt.toDateString(),
        updatedAt  : todo.updatedAt.toDateString(),
      },
    };
  }

  public static toDtoCollection(todos: Todo[]): TodoDtoCollection {
    return todos.map(todo => TodoMapper.toDto(todo));
  }
}
