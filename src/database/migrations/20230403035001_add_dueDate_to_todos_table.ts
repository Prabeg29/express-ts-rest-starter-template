import { dbTables } from '@enums/db-tables.enum';
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table(dbTables.TODOS, function (table) {
    table.datetime('dueDate').nullable().after('description');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table(dbTables.TODOS, function (table) {
    table.dropColumn('dueDate');
  });
}
