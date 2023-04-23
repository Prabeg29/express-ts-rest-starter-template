import { Server } from 'http';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import { App } from '../../../app';
import knexInstance, { refreshDatabase } from '../../../database';

describe('Todo APIs', () => {
  let server: Server;
  let response: request.Response;

  const id = 5454;
  
  beforeEach(async () => {
    server = (new App()).listen(3000);
    await refreshDatabase();
    jest.clearAllMocks();
  });

  afterEach(() => {
    server.close();
  });

  describe('GET: /api/todos/:id', () => {
    it('should return error when id is invalid', async () => {
      response = await request(server)
        .get(`/api/todos/${id}`)
        .set('Accept', 'application/json');
  
      expect(response.status).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toEqual('Todo not found');
    });

    it('should return todo when id is valid', async () => {
      await knexInstance.seed.run();

      response = await request(server)
        .get(`/api/todos/${id}`)
        .set('Accept', 'application/json');
        
      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body).toHaveProperty('todo');
      expect(response.body.todo.id).toEqual(id);
      expect(response.body.todo.attributes).toEqual({
        title      : expect.any(String),
        description: expect.any(String),
        isComplete : expect.any(Number),
        dueDate    : expect.any(String),
        createdAt  : expect.any(String),
        updatedAt  : expect.any(String)
      });
    });
  });
});
