import { Router } from 'express';

import knex from '../database';
import { validate } from '@middlewares/validator';
import { TodoController } from '@modules/todos/todo.controller';
import { todoSchema } from '@modules/todos/validations/todo.schema';
import { CreateTodoUseCase } from '@modules/todos/use-cases/create-todo.use-case';
import { DeleteTodoUseCase } from '@modules/todos/use-cases/delete-todo.use.case';
import { UpdateTodoUseCase } from '@modules/todos/use-cases/update-todo.use.case';
import { GetOneTodoUseCase } from '@modules/todos/use-cases/get-one-todo.use.case';
import { GetAllTodosUseCase } from '@modules/todos/use-cases/get-all-todos.use-case';
import { KnexTodoRepository } from '@modules/todos/repositories/knex-todo.repository';


const router = Router();
const todoController: TodoController = new TodoController(
  new GetAllTodosUseCase(new KnexTodoRepository(knex)),
  new CreateTodoUseCase(new KnexTodoRepository(knex)),
  new GetOneTodoUseCase(new KnexTodoRepository(knex)),
  new UpdateTodoUseCase(new KnexTodoRepository(knex)),
  new DeleteTodoUseCase(new KnexTodoRepository(knex))

);

router.get('/', todoController.index);
router.get('/:id', todoController.show);
router.post('/', validate(todoSchema), todoController.store);
router.put('/:id', validate(todoSchema), todoController.update);
router.delete('/:id', todoController.destroy);

export default router;
