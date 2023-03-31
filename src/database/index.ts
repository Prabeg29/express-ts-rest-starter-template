import knex from 'knex';

import logger from '@utils/logger';
import knexConfig from '../knexfile';

const knexInstance = knex(knexConfig);

export const refreshDatabase = async () => {
  try {
    await knexInstance.migrate.rollback({}, true);
    await knexInstance.migrate.latest();
    await knexInstance.seed.run();

    logger.info('Database refreshed');
  } catch (err) {
    logger.error({ err });
  }
};

export default knexInstance;
