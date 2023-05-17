import { Knex } from 'knex';

import { dbTables } from '@enums/db-tables.enum';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(dbTables.LABELS, function (table) {
    table.increments();

    table.string('name').notNullable().unique();

    table.timestamps(true, true, true);
    table.timestamp('deletedAt').nullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(dbTables.LABELS);
}

