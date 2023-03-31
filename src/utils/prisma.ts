import { PrismaClient, PrismaPromise } from '@prisma/client';

import logger from './logger';

class PrismaService extends PrismaClient {
  constructor() {
    super();
  }

  async cleanDatabase() {
    const transactions: PrismaPromise<any>[] = [];
    transactions.push(this.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`);
    
    const tableNames = await this.$queryRaw<Array<{ TABLE_NAME: string }>>`SELECT TABLE_NAME from information_schema.TABLES WHERE TABLE_SCHEMA = 'ts-blinqed-test';`;
    
    for (const { TABLE_NAME } of tableNames) {
      if (TABLE_NAME === '_prisma_migrations')
        continue;
    
      try {
        transactions.push(this.$executeRawUnsafe(`TRUNCATE ${TABLE_NAME};`));
      } catch (error) {
        console.log({ error });
      }
    }
    
    transactions.push(this.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`);
    
    try {
      await this.$transaction(transactions);
    } catch (error) {
      logger.error({ error });
    }
  }
}

export default new PrismaService();
