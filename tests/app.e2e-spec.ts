import supertest, { Agent } from 'supertest';

import app from '|/app';
import { sql } from '|/infrastructures/sql';

describe('AppController (e2e)', () => {
  let agent: Agent;

  beforeAll(() => {
    agent = supertest(app);
  });

  it('should test sql connection', async () => {
    expect(() => sql.authenticate()).not.toThrow();
  });

  test('/ (GET)', async () => {
    const resp = await agent.get('/');

    expect(resp.status).toBe(200);
  });

  test('/not-found (GET)', async () => {
    const resp = await agent.get('/not-found');

    expect(resp.status).toBe(404);
  });

  describe('Auth', () => {
    describe('/register (POST)', () => {
      test('should register fail', async () => {
        const body = {};
        const resp = await agent.post('/register').send(body);

        expect(resp.status).toBe(422);
        expect(resp.body);
      });

      const body = {
        name: 'test',
        email: 'test@test.com',
        username: 'test',
        password: 'test1234',
      };
      test('should register success', async () => {
        const resp = await agent.post('/register').send(body);

        expect(resp.status).toBe(201);
        expect(resp.body).toHaveProperty('status');
        expect(resp.body.status).toBe('success');
        expect(resp.body).toHaveProperty('result');
      });

      test('should register duplicated', async () => {
        const resp = await agent.post('/register').send(body);

        expect(resp.status).toBe(409);
        expect(resp.body).toHaveProperty('status');
        expect(resp.body.status).toBe('error');
      });
    });

    describe('/login (POST)', () => {
      test('should login invalid request', async () => {
        const body = {};
        const resp = await agent.post('/login').send(body);

        expect(resp.status).toBe(422);
        expect(resp.body).toHaveProperty('status');
        expect(resp.body.status).toBe('error');
        expect(resp.body).toHaveProperty('errors');
      });

      test('should login user not found', async () => {
        const body = {
          userSession: 'testa@test.com',
          password: 'tesat1234',
        };
        const resp = await agent.post('/login').send(body);

        expect(resp.status).toBe(400);
        expect(resp.body).toHaveProperty('status');
        expect(resp.body.status).toBe('error');
      });

      test('should login wrong password', async () => {
        const body = {
          userSession: 'test@test.com',
          password: 'testa1234',
        };
        const resp = await agent.post('/login').send(body);

        expect(resp.status).toBe(400);
        expect(resp.body).toHaveProperty('status');
        expect(resp.body.status).toBe('error');
      });

      test('should login success', async () => {
        const body = {
          userSession: 'test@test.com',
          password: 'test1234',
        };
        const resp = await agent.post('/login').send(body);

        expect(resp.status).toBe(200);
        expect(resp.body).toHaveProperty('status');
        expect(resp.body.status).toBe('success');
        expect(resp.body).toHaveProperty('result');
        expect(resp.body.result).toHaveProperty('type');
        expect(resp.body.result).toHaveProperty('accessToken');
        expect(resp.body.result).toHaveProperty('refreshToken');
        expect(resp.body.result.type).toBe('Bearer');
        expect(typeof resp.body.result.accessToken).toBe('string');
        expect(typeof resp.body.result.refreshToken).toBe('string');
      });
    });
  });
});
