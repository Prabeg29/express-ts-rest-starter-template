import { Server } from 'http';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import { App } from '../../../app';
import knexInstance, { refreshDatabase } from '../../../database';

describe('GET: /api/todos', () => {
  const server: Server = (new App()).listen(3000);
  let response: request.Response;
  const currentPage = 1;
  const perPage = 25;

  beforeEach(async () => {
    await refreshDatabase();
  });

  afterAll(() => {
    server.close();
  });

  it('should return list of paginated todos when there are todos', async () => {
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
