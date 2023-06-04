import { Server } from 'http';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import { App } from '../../../app';
import knexInstance, { refreshDatabase } from '../../../database';
import { KnexLabelRepository } from '../repositories/knex-label.repository';

describe('POST: /api/labels', () => {
  const server: Server = (new App()).listen(3000);
  let response: request.Response;

  const invalidSignupPayloadSet = [
    // empty payload
    {},
  ];
  const validLabelPayload = { 'name': 'finance' };

  beforeEach(async () => {
    await refreshDatabase();
  });

  afterAll(() => {
    server.close();
  });

  it.each(invalidSignupPayloadSet)('should throw validation errors', async (invalidPayload) => {
    response = await request(server)
      .post('/api/labels')
      .set('Accept', 'application/json')
      .send(invalidPayload);

    expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
  });

  it('should throw error when trying to create label that already exists', async () => {
    await (new KnexLabelRepository(knexInstance)).create({ 'name': 'passion'});

    response = await request(server)
      .post('/api/labels')
      .set('Accept', 'application/json')
      .send({ 'name': 'passion'});

    expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(response.body.message).toEqual('passion as label already exists');
  });

  it('should create a new label resource', async () => {
    response = await request(server)
      .post('/api/labels')
      .set('Accept', 'application/json')
      .send(validLabelPayload);

    expect(response.status).toEqual(StatusCodes.CREATED);
    expect(response.body).toHaveProperty('label');
    expect(response.body.label.id).toEqual(expect.any(Number));
    expect(response.body.todo.attributes).toEqual({name: validLabelPayload.name});
  });
});
