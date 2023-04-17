import { Server } from 'http';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import { App } from '../../../app';
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
      const currentPage = 1;
      const perPage = 25;

      response = await request(server)
        .get(`/api/todos?currentPage=${currentPage}&perPage=${perPage}`)
        .set('Accept', 'application/json');
  
      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body).toHaveProperty('meta');
      expect(response.body).toHaveProperty('todos');
      expect(response.body.meta).toHaveProperty('paginationInfo');
      expect(response.body.meta.paginationInfo).toEqual({
        total      : 10000,
        perPage    : perPage,
        currentPage: currentPage,
        lastPage   : Math.ceil(10000/perPage),
        prevPage   : null,
        nextPage   : 2
      });
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
