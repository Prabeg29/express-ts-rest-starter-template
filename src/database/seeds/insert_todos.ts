import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

import { TodoInput } from '@modules/todos/todo.type';
import { dbTables } from '@enums/db-tables.enum';

const createFakeTodo = (): TodoInput => {
  return {
    title      : faker.lorem.sentence(5),
    description: faker.lorem.sentence(10),
    isComplete : faker.datatype.boolean(),
    dueDate    : faker.date.soon(14),
  };
};

export async function seed(knex: Knex): Promise<void> {
  const todos: Array<TodoInput> = [];

  Array.from({ length: 999999 }).forEach(() => {
    todos.push(createFakeTodo());
  });

  await knex(dbTables.TODOS).del();

  await knex.batchInsert(dbTables.TODOS, todos, 1000);
}
