import { Knex } from 'knex';

import { paginate, PaginationInfo } from '../../../database';
import { dbTables } from '@enums/db-tables.enum';
import { Todo, TodoInput } from '@modules/todos/todo.type';
import { TodoRepositoryInterface } from './todo.repository.interface';
import { getAllTodosParams } from '../interfaces/get-all-todos-params.interface';

export class KnexTodoRepository implements TodoRepositoryInterface {
  constructor(protected readonly knex: Knex) { }

  async getOne(id: number): Promise<Todo | undefined> {
    return await this.knex<Todo>(dbTables.TODOS).where('id', id).first();
  }

  async getAllPaginated(
    { currentPage, perPage, start, end }: getAllTodosParams): Promise<{
    data: Todo[];
    paginationInfo: PaginationInfo;
  }> {
    const query = this.knex<Todo>(dbTables.TODOS)
      .whereBetween('dueDate', [start, end])
      .select();

    return await paginate<Todo>(query, Number(currentPage), Number(perPage));
  }

  async create(todo: TodoInput): Promise<number[]> {
    return await this.knex(dbTables.TODOS).insert({ ...todo }, ['id']);
  }

  async update(id: number, todo: TodoInput): Promise<boolean> {
    return await this.knex(dbTables.TODOS).where('id', id).update({ ...todo });
  }

  async delete(id: number): Promise<number> {
    return await this.knex(dbTables.TODOS).where('id', id).del();
  }
}
