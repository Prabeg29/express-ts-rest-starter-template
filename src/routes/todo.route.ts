import { Router } from 'express';

import knex from '../database';
import { validate } from '@middlewares/validator';
import { tryCatchWrapper } from '@utils/try-catch-wrapper';
import { todoSchema } from '@modules/todos/validations/todo.schema';
import { GetAllTodosUseCase } from '@modules/todos/use-cases/get-all-todos.use-case';
import { KnexTodoRepository } from '@modules/todos/repositories/knex-todo.repository';
import { StoreTodoController } from '@modules/todos/controllers/store-todo.controller';
import { DeleteTodoController } from '@modules/todos/controllers/delete-todo.controller';
import { UpdateTodoController } from '@modules/todos/controllers/update-todo.controller';
import { GetOneTodoController } from '@modules/todos/controllers/get-one-todo.controller';
import { GetAllTodosController } from '@modules/todos/controllers/get-all-todos.controller';

const router = Router();
const getAllTodosController = new GetAllTodosController(
  new GetAllTodosUseCase(new KnexTodoRepository(knex))
);
const getOneTodoController = new GetOneTodoController(new KnexTodoRepository(knex));
const storeTodoController = new StoreTodoController(new KnexTodoRepository(knex));
const updateTodoController = new UpdateTodoController(new KnexTodoRepository(knex));
const deleteTodoController = new DeleteTodoController(new KnexTodoRepository(knex));

router.get('/', tryCatchWrapper(getAllTodosController.execute));
router.get('/:id', tryCatchWrapper(getOneTodoController.execute));
router.post('/', validate(todoSchema), tryCatchWrapper(storeTodoController.execute));
router.put('/:id', validate(todoSchema), tryCatchWrapper(updateTodoController.execute));
router.delete('/:id', tryCatchWrapper(deleteTodoController.execute));

export default router;
