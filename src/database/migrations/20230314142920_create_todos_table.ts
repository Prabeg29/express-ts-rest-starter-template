import { Knex } from 'knex';

import { dbTables } from '@enums/db-tables.enum';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(dbTables.TODOS, function (table) {
    table.increments();

    table.string('title').notNullable();
    table.text('description').nullable();
    table.boolean('isComplete').defaultTo(false);

    table.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(dbTables.TODOS);
}
