export interface Label {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type LabelInput = Omit<Label, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export interface LabelDto {
  id: number;
  attributes: {
    name: string;
  },
}

export type LabelDtoCollection = LabelDto[];
