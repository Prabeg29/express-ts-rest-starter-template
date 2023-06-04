import { faker } from '@faker-js/faker';

import { TodoInput } from '@modules/todos/todo.type';

export const TodoFactory = (count: number) => {
  const createFakeTodo = (): TodoInput => {
    return {
      title      : faker.lorem.sentence(5),
      description: faker.lorem.sentence(10),
      isComplete : faker.datatype.boolean(),
      dueDate    : faker.date.soon(14),
    };
  };

  const todos: Array<TodoInput> = [];

  Array.from({ length: count }).forEach(() => {
    todos.push(createFakeTodo());
  });
    
  return todos;
};
