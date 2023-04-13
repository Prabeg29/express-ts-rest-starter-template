import { Server } from 'http';
import request from 'supertest';

import { App } from '../../../app';
import { StatusCodes } from 'http-status-codes';
import { refreshDatabase } from '../../../database';

describe('Todo APIs', () => {
  let server: Server;
  let response: request.Response;

  beforeEach(async () => {
    server = (new App()).listen(3000);
    await refreshDatabase();
    jest.clearAllMocks();
  });

  afterEach(() => {
    server.close();
  });

  describe('GET: /api/todos', () => {
    it.only('should return list of todos', async () => {
      const perPage = 25;

      response = await request(server)
        .get(`/api/todos?currentPage=1&perPage=${perPage}`)
        .set('Accept', 'application/json');

      console.log(JSON.stringify(response.body.meta, null, 2));
  
      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body).toHaveProperty('meta');
      expect(response.body).toHaveProperty('todos');
      expect(response.body.meta).toHaveProperty('paginationInfo');
      expect(response.body.todos.length).toEqual(perPage);
    });
  });

  describe('GET: /api/todos/:id', () => {
    it.only('should return todo when id is valid', async () => {
      const validId = '5454';

      response = await request(server)
        .get(`/api/todos/${validId}`)
        .set('Accept', 'application/json');
  
      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body).toHaveProperty('todo');
    });
  });
});
