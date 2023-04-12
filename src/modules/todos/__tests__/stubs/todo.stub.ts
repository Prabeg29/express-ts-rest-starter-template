import { Todo } from '@modules/todos/todo.type';

export const todosStub = (): Todo[] => {
  return [
    {
      id         : 1,
      title      : 'Todo title',
      description: 'Todo description',
      isComplete : false,
      dueDate    : new Date('2023-04-23 00:00:00'),
      createdAt  : new Date('2022-12-09 00:00:00'),
      updatedAt  : new Date('2022-12-09 00:00:00'),
    }
  ];
};