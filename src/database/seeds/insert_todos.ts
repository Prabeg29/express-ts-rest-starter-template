import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

import { TodoInput } from '@modules/todos/todo.type';
import { dbTables } from '@enums/db-tables.enum';

const createFakeTodo = (): TodoInput => {
  return {
    title      : faker.lorem.sentence(5),
    description: faker.lorem.sentence(10),
    isComplete : faker.datatype.boolean(),
    dueDate    : faker.date.future(),
  };
};

export async function seed(knex: Knex): Promise<void> {
  const todos: Array<TodoInput> = [];

  Array.from({ length: 500000 }).forEach(() => {
    todos.push(createFakeTodo());
  });

  await knex(dbTables.TODOS).del();

  await knex(dbTables.TODOS).insert(todos);
}
