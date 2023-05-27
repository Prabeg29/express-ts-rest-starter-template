import { Label, LabelDtoCollection } from '@modules/labels/label.type';

export interface Todo {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoWithLabel = Omit<Todo, 'updatedAt'> & { labelId: number; labelName: string }
export type TodoWithLabels = Omit<Todo, 'updatedAt'> & { labels?: Array<Label> }

export type TodoInput = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>; 

export interface TodoDto {
  id: number;
  attributes: {
    title: string;
    description: string;
    isComplete: boolean;
    dueDate: string;
    createdAt: string;
  },
  relationships: {
    labels: LabelDtoCollection
  }
}

export type TodoDtoCollection = TodoDto[];
