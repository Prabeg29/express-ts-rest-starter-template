// import { StatusCodes } from 'http-status-codes';
// import { Request, Response } from 'express';

// import TodoMapper from '@modules/todos/todo.mapper';
// import { TodoInput } from '@modules/todos/todo.type';
// import { TodoRepositoryInterface } from '@modules/todos/repositories/todo.repository.interface';

// export class UpdateTodoController {
//   constructor(private readonly _todoRepository: TodoRepositoryInterface) {}

//   public execute = async (req: Request, res: Response): Promise<void> => {
//     let todoId: number;
//     let todo =  await this._todoRepository.getOne(parseInt(req.params.id));

//     if (!todo) {
//       [todoId] = await this._todoRepository.create(req.body as TodoInput);
//       todo =  await this._todoRepository.getOne(todoId);

//       res.status(StatusCodes.CREATED).json({ todo: TodoMapper.toDto(todo) });
//     }

//     await this._todoRepository.update(todo.id, req.body as TodoInput);
//     todo =  await this._todoRepository.getOne(todo.id);

//     res.status(StatusCodes.OK).json({ todo: TodoMapper.toDto(todo) });
//   };
// }
