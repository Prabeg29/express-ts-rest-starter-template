import { Knex } from 'knex';

import { dbTables } from '@enums/db-tables.enum';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table(dbTables.TODOS, function (table) {
    table.string('description',1000).nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table(dbTables.TODOS, function (table) {
    table.text('description').nullable().alter();
  });
}

