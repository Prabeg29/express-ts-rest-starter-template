import { Knex } from 'knex';

import { dbTables } from '@enums/db-tables.enum';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(dbTables.LABEL_TODO, function (table) {
    table.increments();

    table.integer('todoId').unsigned().notNullable();
    table.integer('labelId').unsigned().notNullable();

    table.timestamps(true, true, true);

    table.foreign('todoId').references(`${dbTables.TODOS}.id`).onDelete('CASCADE');
    table.foreign('labelId').references(`${dbTables.LABELS}.id`).onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table(dbTables.LABEL_TODO, function (table) {
    table.dropForeign(['todoId']);
    table.dropForeign(['labelId']);
  });
  await knex.schema.dropTable(dbTables.LABEL_TODO);
}
