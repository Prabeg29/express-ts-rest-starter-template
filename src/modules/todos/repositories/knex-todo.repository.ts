import { Knex } from 'knex';

import logger from '@utils/logger';
import { dbTables } from '@enums/db-tables.enum';
import { Todo, TodoInput } from '@modules/todos/todo.type';
import { paginate, PaginationInfo } from '../../../database';
import { TodoRepositoryInterface } from './todo.repository.interface';
import { getAllTodosParams } from '../interfaces/get-all-todos-params.interface';
export class KnexTodoRepository implements TodoRepositoryInterface {
  constructor(protected readonly knex: Knex) { }

  async getOne(id: number): Promise<Todo | undefined> {
    return await this.knex<Todo>(dbTables.TODOS).where('id', id).first();
  }

  async getAllPaginated(
    { currentPage, perPage, start, end }: getAllTodosParams): Promise<{
    data: Array<Todo & { labelId: number; labelName: string; }>;
    paginationInfo: PaginationInfo;
  }> {
    const selectParams = [
      `${dbTables.TODOS}.id`,
      `${dbTables.TODOS}.title`,
      `${dbTables.TODOS}.description`,
      `${dbTables.TODOS}.dueDate`,
      `${dbTables.TODOS}.isComplete`,
      `${dbTables.TODOS}.createdAt`,
      'subquery.labelId',
      'subquery.labelName'
    ];

    const labelSubquery = this.knex(dbTables.LABEL_TODO)
      .join(dbTables.LABELS, `${dbTables.LABEL_TODO}.labelId`, `${dbTables.LABELS}.id`)
      .select(`${dbTables.LABEL_TODO}.todoId`, `${dbTables.LABELS}.id as labelId`, `${dbTables.LABELS}.name as labelName`)
      .as('subquery');

    const todosWithLabels = this.knex(dbTables.TODOS)
      .leftJoin(labelSubquery, `${dbTables.TODOS}.id`, 'subquery.todoId')
      .whereBetween('dueDate', [start, end])
      .orderBy('todos.createdAt', 'desc');

    return await paginate<Todo & { labelId: number; labelName: string;}>(todosWithLabels, {
      currentPage: Number(currentPage),
      perPage    : Number(perPage),
      selectParams,
      countParam : `${dbTables.TODOS}.id`
    });
  }

  async create(todo: TodoInput): Promise<number[]> {
    return await this.knex(dbTables.TODOS).insert({ ...todo }, ['id']);
  }

  async createWithLabel(todo: TodoInput, labelIds: Array<number>): Promise<number>{
    const trx = await this.knex.transaction();

    try {
      const [todoId] = await trx(dbTables.TODOS).insert({ ...todo }, ['id']);

      for (const labelId of labelIds) {
        await trx(dbTables.LABEL_TODO).insert({ todoId, labelId });
      }
      
      await trx.commit();

      return todoId;
    } catch (err) {
      logger.error(err);
      await trx.rollback();
    }
  }

  async update(id: number, todo: TodoInput): Promise<boolean> {
    return await this.knex(dbTables.TODOS).where('id', id).update({ ...todo });
  }

  async delete(id: number): Promise<number> {
    return await this.knex(dbTables.TODOS).where('id', id).del();
  }
}
