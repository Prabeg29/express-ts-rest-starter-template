import { Knex } from 'knex';

import { dbTables } from '@enums/db-tables.enum';
import { Todo, TodoInput } from '@modules/todos/todo.type';

export interface TodoRepositoryInterface {
  getOne(id: number): Promise<Todo | undefined>;
  getAll(): Promise<Todo[]>;
  create(todo: TodoInput): Promise<number[]>;
  update(id: number, todo: TodoInput): Promise<boolean>;
  delete(id: number): Promise<number>;
}

export class KnexTodoRepository implements TodoRepositoryInterface {
  constructor(protected readonly knex: Knex) { }

  async getOne(id: number): Promise<Todo | undefined> {
    return await this.knex<Todo>(dbTables.TODOS).where('id', id).first();
  }

  async getAll(): Promise<Todo[]> {
    return await this.knex<Todo>(dbTables.TODOS).select();
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
