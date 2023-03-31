import { Server } from 'http';
import request from 'supertest';

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
    knexInstance.destroy();
    server.close();
  });

  describe('GET: /api/todos', () => {
    it('should return list of todos', async () => {
      response = await request(server)
        .get('/api/todos')
        .set('Accept', 'application/json');
  
      expect(response.status).toEqual(200);
    });
  });

  describe('POST: /api/todos', () => {
    it('should return list of todos', async () => {
      response = await request(server)
        .get('/api/todos')
        .set('Accept', 'application/json');
  
      expect(response.status).toEqual(200);
    });
  });
});
