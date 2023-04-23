import { Server } from 'http';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import { App } from '../../../app';
import knexInstance, { refreshDatabase } from '../../../database';

describe('Todo APIs', () => {
  let server: Server;
  let response: request.Response;

  const invalidSignupPayloadSet = [
    // empty payload
    {},
  ];
  const validTodoPayload = {
    title      : 'SIP payment',
    description: 'Pay your SIP amount',
    isComplete : false,
    dueDate    : '2023-04-22'
  };

  beforeEach(async () => {
    server = (new App()).listen(3000);
    await refreshDatabase();
    jest.clearAllMocks();
  });

  afterEach(() => {
    server.close();
  });

  describe('PUT: /api/todos/:id', () => {
    it.each(invalidSignupPayloadSet)('should throw validation errors', async (invalidPayload) => {
      response = await request(server)
        .put('/api/todos/1')
        .set('Accept', 'application/json')
        .send(invalidPayload);

      expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    });

    it('should update an existing todo', async () => {
      await knexInstance.seed.run();

      response = await request(server)
        .put('/api/todos/1')
        .set('Accept', 'application/json')
        .send(validTodoPayload);

      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body).toHaveProperty('todo');
      expect(response.body.todo.id).toEqual(expect.any(Number));
      expect(response.body.todo.attributes).toEqual({
        title      : validTodoPayload.title,
        description: validTodoPayload.description,
        isComplete : 0,
        dueDate    : new Date(validTodoPayload.dueDate).toDateString(),
        createdAt  : expect.any(String),
        updatedAt  : expect.any(String)
      });
    });

    it('should create a new todo if does not exists', async () => {
      response = await request(server)
        .put('/api/todos/1')
        .set('Accept', 'application/json')
        .send(validTodoPayload);

      expect(response.status).toEqual(StatusCodes.CREATED);
      expect(response.body).toHaveProperty('todo');
      expect(response.body.todo.id).toEqual(expect.any(Number));
      expect(response.body.todo.attributes).toEqual({
        title      : validTodoPayload.title,
        description: validTodoPayload.description,
        isComplete : 0,
        dueDate    : new Date(validTodoPayload.dueDate).toDateString(),
        createdAt  : expect.any(String),
        updatedAt  : expect.any(String)
      });
    });
  });
});
