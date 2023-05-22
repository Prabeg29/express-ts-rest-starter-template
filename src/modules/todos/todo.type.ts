export interface Todo {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  dueDate: Date;
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
    dueDate: string;
    createdAt: string;
    updatedAt: string;
  },
}

export type TodoDtoCollection = TodoDto[];
