import { Server } from 'http';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import { App } from '../../../app';
import { refreshDatabase } from '../../../database';

describe('POST: /api/todos', () => {
  const server: Server = (new App()).listen(3000);
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
    await refreshDatabase();
  });

  afterAll(() => {
    server.close();
  });

  it.each(invalidSignupPayloadSet)('should throw validation errors', async (invalidPayload) => {
    response = await request(server)
      .post('/api/todos')
      .set('Accept', 'application/json')
      .send(invalidPayload);

    expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
  });

  it('should create a new todo resource', async () => {
    response = await request(server)
      .post('/api/todos')
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
