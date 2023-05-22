import { PaginationInfo } from '@database';
import { Todo, TodoInput } from '../todo.type';
import { getAllTodosParams } from '@modules/todos/interfaces/get-all-todos-params.interface';

export interface TodoRepositoryInterface {
  getOne(id: number): Promise<Todo | undefined>;
  getAllPaginated({ currentPage, perPage, start, end }: getAllTodosParams): Promise<{
    data: Todo[];
    paginationInfo: PaginationInfo;
  }>;
  create(todo: TodoInput): Promise<number[]>;
  createWithLabel(todo: TodoInput, labelIds: Array<number>): Promise<number>;
  update(id: number, todo: TodoInput): Promise<boolean>;
  delete(id: number): Promise<number>;
}