import { Knex } from 'knex';

import { dbTables } from '@enums/db-tables.enum';

export async function seed(knex: Knex): Promise<void> {
  await knex(dbTables.TODOS).del();

  await knex(dbTables.TODOS).insert([
    { 
      title      : 'first todo',
      description: 'first description',
      isComplete : true,
    },
    { 
      title      : 'second todo',
      description: 'second description',
      isComplete : false,
    },
    { 
      title      : 'third todo',
      description: 'third description',
      isComplete : true,
    },
  ]);
}
