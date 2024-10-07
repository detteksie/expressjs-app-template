import supertest from 'supertest';

import app from '|/app';
import { mongodb } from '|/infrastructures/mongodb';
import { User } from '|/models/user.model';
import { createToken } from '|/utils/jwt.util';

describe('UserController (e2e)', () => {
  let agent: supertest.Agent;
  let accessToken: string;

  beforeAll(async () => {
    agent = supertest(app);

    const user = new User({
      id: 1,
      email: 'ssamsara98@mailsac.com',
      username: 'ssamsara98',
      password: '',
      name: '',
    });
    accessToken = createToken(user, 'access');

    await mongodb.connect();
  });

  afterAll(async () => {
    await mongodb.disconnect();
  });

  describe('/v1/todos (POST)', () => {
    test('should create a todo', async () => {
      const body = {
        task: 'lorem ipsum',
        description: 'dolor sit amet',
      };
      const resp = await agent.post('/v1/todos').set('Authorization', accessToken).send(body);

      expect(resp.status).toBe(201);
      expect(resp.body).toHaveProperty('status');
      expect(resp.body.status).toBe('success');
      expect(resp.body).toHaveProperty('result');
    });
  });

  describe('/v1/todos (GET)', () => {
    test('should get todo list pagination', async () => {
      const resp = await agent.get('/v1/todos').set('Authorization', accessToken);

      expect(resp.status).toBe(200);
      expect(resp.body).toHaveProperty('status');
      expect(resp.body.status).toBe('success');
      expect(resp.body).toHaveProperty('result');
      expect(resp.body.result).toHaveProperty('items');
      expect(resp.body.result).toHaveProperty('meta');
    });
  });

  describe('/v1/todos/t/:todoId (GET)', () => {
    test('should get a todo', async () => {
      const resp = await agent
        .get('/v1/todos/t/66243689fc15ae719ba24174')
        .set('Authorization', accessToken);

      expect(resp.status).toBe(200);
    });
  });

  describe('/v1/todos/t/:todoId (PATCH)', () => {
    test('should update a todo', async () => {
      const resp = await agent
        .patch('/v1/todos/t/66243689fc15ae719ba24174')
        .set('Authorization', accessToken);

      expect(resp.status).toBe(204);
    });
  });

  describe('/v1/todos/t/:todoId (DELETE)', () => {
    test('should delete a todo', async () => {
      const resp = await agent
        .delete('/v1/todos/t/66243689fc15ae719ba24174')
        .set('Authorization', accessToken);

      expect(resp.status).toBe(204);
    });
  });
});
