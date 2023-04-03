import { PaginationInfo } from '@database';
import { Todo, TodoInput } from '../todo.type';

export interface TodoRepositoryInterface {
  getOne(id: number): Promise<Todo | undefined>;
  getAllPaginated(currentPage: number, perPage: number): Promise<{
    data: Todo[];
    paginationInfo: PaginationInfo;
  }>;
  create(todo: TodoInput): Promise<number[]>;
  update(id: number, todo: TodoInput): Promise<boolean>;
  delete(id: number): Promise<number>;
}