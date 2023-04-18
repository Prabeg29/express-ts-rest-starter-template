import { Server } from 'http';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import { App } from '../../../app';
import knexInstance, { refreshDatabase } from '../../../database';

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
    const currentPage = 1;
    const perPage = 25;

    it('should return list of todos when there are todos', async () => {
      await knexInstance.seed.run();

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

    it('should return empty list when there are no todos', async () => {
      response = await request(server)
        .get(`/api/todos?currentPage=${currentPage}&perPage=${perPage}`)
        .set('Accept', 'application/json');
  
      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body).toHaveProperty('meta');
      expect(response.body).toHaveProperty('todos');
      expect(response.body.meta).toHaveProperty('paginationInfo');
      expect(response.body.meta.paginationInfo).toEqual({
        total      : 0,
        perPage    : perPage,
        currentPage: currentPage,
        lastPage   : Math.ceil(0/perPage),
        prevPage   : null,
        nextPage   : null
      });
      expect(response.body.todos.length).toEqual(0);
    });
  });

  describe('GET: /api/todos/:id', () => {
    const id = 5454;

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
      expect(response.body.todo.meta.link).toEqual(`http://localhost:8848/api/todos/${id}`);
    });
  });
});
