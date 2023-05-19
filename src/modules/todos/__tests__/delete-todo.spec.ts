import { Server } from 'http';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import { App } from '../../../app';
import knexInstance, { refreshDatabase } from '../../../database';

describe('DELETE: /api/todos/:id', () => {
  const server: Server = (new App()).listen(3000);
  let response: request.Response;

  const id = 5454;

  beforeEach(async () => {
    await refreshDatabase();
  });

  afterAll(() => {
    server.close();
  });

  it('should return error when id is invalid', async () => {
    response = await request(server)
      .delete(`/api/todos/${id}`)
      .set('Accept', 'application/json');

    expect(response.status).toEqual(StatusCodes.NOT_FOUND);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Todo not found');
  });

  it('should delete todo resource', async () => {
    await knexInstance.seed.run();

    response = await request(server)
      .delete(`/api/todos/${id}`)
      .set('Accept', 'application/json');

    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Todo deleted');
  });
});
