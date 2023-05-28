import knex, { Knex } from 'knex';

import logger from '@utils/logger';
import knexConfig from '../knexfile';

const knexInstance = knex(knexConfig);

export const refreshDatabase = async () => {
  try {
    await knexInstance.migrate.rollback({}, true);
    await knexInstance.migrate.latest();

    logger.info('Database refreshed');
  } catch (err) {
    logger.error({ err });
  }
};

export default knexInstance;

interface PaginateOptions {
  currentPage: number;
  perPage: number;
  selectParams: Array<string>;
  countParam: string;
}

export interface PaginationInfo {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  prevPage: number;
  nextPage: number;
}

export const paginate = async <T>(
  queryBuilder: Knex.QueryBuilder,
  { currentPage, perPage, selectParams = ['*'], countParam = '*' }: PaginateOptions) => {
  if (currentPage < 1) {
    currentPage = 1;
  }

  const offSet = (currentPage - 1) * perPage;
  const data = await queryBuilder.clone().select(selectParams).limit(perPage).offset(offSet) as T[];
  const total = (await queryBuilder.clone().count(`${countParam} as count`).first()).count;
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
