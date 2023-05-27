// import { StatusCodes } from 'http-status-codes';
// import { Request, Response } from 'express';

// import TodoMapper from '@modules/todos/todo.mapper';
// import { TodoInput } from '@modules/todos/todo.type';
// import { TodoRepositoryInterface } from '@modules/todos/repositories/todo.repository.interface';

// export class StoreTodoController {
//   constructor(private readonly _todoRepository: TodoRepositoryInterface) {}

//   public execute  = async (req: Request, res: Response): Promise<void> => {
//     let todoId: number;
//     const labelIds: Array<number> = req.body.labelIds;
//     delete req.body.labelIds;

//     if (labelIds.length) {
//       todoId = await this._todoRepository.createWithLabel(req.body as TodoInput, labelIds);
//     } else {
//       [todoId] = await this._todoRepository.create(req.body as TodoInput);
//     }

//     const todo =  await this._todoRepository.getOne(todoId);

//     res.status(StatusCodes.CREATED).json({ todo: TodoMapper.toDto(todo) });
//   };
// }
