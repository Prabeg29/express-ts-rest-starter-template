export interface Todo {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoInput = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;

export interface TodoDto {
  id: number;
  attributes: {
    title: string;
    description: string;
    isComplete: boolean;
    createdAt: string;
    updatedAt: string;
  },
  meta: {
    link: URL
  }
}

export type TodoDtoCollection = TodoDto[];
