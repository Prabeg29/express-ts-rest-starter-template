import { Knex } from 'knex';

import { dbTables } from '@enums/db-tables.enum';
import { Label, LabelInput } from '@modules/labels/label.type';
import { LabelRepositoryInterface } from '@modules/labels/repositories/label.repository.interface';

export class KnexLabelRepository implements LabelRepositoryInterface {
  constructor(protected readonly knex: Knex) { }

  async getAll(): Promise<Label[]> {
    return await this.knex<Label>(dbTables.LABELS)
      .select();
  }

  async create(label: LabelInput): Promise<number[]> {
    return await this.knex(dbTables.LABELS).insert({ ...label }, ['id']);
  }

  async getOne(id: number): Promise<Label | undefined> {
    return await this.knex<Label>(dbTables.LABELS).where('id', id).first();
  }

  async getOneByName(name: string): Promise<Label | undefined> {
    return await this.knex<Label>(dbTables.LABELS).where('name', name).first();
  }
}
