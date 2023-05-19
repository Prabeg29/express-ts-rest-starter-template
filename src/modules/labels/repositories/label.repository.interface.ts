import { Label, LabelInput } from '@modules/labels/label.type';

export interface LabelRepositoryInterface {
  getAll(): Promise<Label[]>;
  create(label: LabelInput): Promise<number[]>;
  getOne(id: number): Promise<Label | undefined>;
  getOneByName(name: string): Promise<Label | undefined>;
}