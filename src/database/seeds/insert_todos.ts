import { Knex } from 'knex';

import { dbTables } from '@enums/db-tables.enum';
import { TodoInput } from '@modules/todos/todo.type';
import { TodoFactory } from '../factories/todo.factory';

export async function seed(knex: Knex): Promise<void> {
  const todos: TodoInput[] = TodoFactory(999999);

  await knex(dbTables.TODOS).del();
  await knex.batchInsert(dbTables.TODOS, todos, 1000);
}
