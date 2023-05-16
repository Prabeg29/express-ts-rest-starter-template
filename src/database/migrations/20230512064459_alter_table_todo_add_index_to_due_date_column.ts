import { Knex } from 'knex';

import { dbTables } from '@enums/db-tables.enum';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table(dbTables.TODOS, function (table) {
    table.index(['dueDate']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table(dbTables.TODOS, function (table) {
    table.dropIndex(['dueDate']);
  });
}
