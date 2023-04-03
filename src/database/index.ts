import knex, { Knex } from 'knex';

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

export interface PaginationInfo {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  prevPage: number;
  nextPage: number;
}

export const paginate = async <T>(queryBuilder: Knex.QueryBuilder, currentPage: number, perPage: number) => {
  if (currentPage < 1) {
    currentPage = 1;
  }

  const offSet = (currentPage - 1) * perPage;
  const data = await queryBuilder.clone().limit(perPage).offset(offSet) as T[];
  const total = (await queryBuilder.count('* as count').first()).count;
  const lastPage = Math.ceil(total / perPage);

  const paginationInfo: PaginationInfo = {
    total,
    perPage,
    currentPage,
    lastPage,
    prevPage: currentPage > 1 ? currentPage - 1 : null,
    nextPage: currentPage < lastPage ? currentPage + 1 : null,
  };

  return { data, paginationInfo };
};
