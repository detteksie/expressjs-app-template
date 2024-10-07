import supertest, { Agent } from 'supertest';

import app from '|/app';
import { sql } from '|/infrastructures/sql';
import { User } from '|/models/user.model';
import { createToken } from '|/utils/jwt.util';

describe('UserController (e2e)', () => {
  let agent: Agent;
  let accessToken: string;
  let accessTokenNotFound: string;

  beforeAll(() => {
    agent = supertest(app);

    const user = new User({
      id: 1,
      email: 'ssamsara98@mailsac.com',
      username: 'ssamsara98',
      password: '',
      name: '',
    });
    accessToken = createToken(user, 'access');

    const userNotFound = new User({
      id: 1111,
      email: 'ssamsara98@mailsac.com',
      username: 'ssamsara98',
      password: '',
      name: '',
    });
    accessTokenNotFound = createToken(userNotFound, 'access');
  });

  afterAll(async () => {
    await sql.sequelize.close();
  });

  describe('/v1/users (GET)', () => {
    test('should get post list pagination', async () => {
      const resp = await agent.get('/v1/users');

      expect(resp.status).toBe(200);
      expect(resp.body).toHaveProperty('status');
      expect(resp.body.status).toBe('success');
      expect(resp.body).toHaveProperty('result');
      expect(resp.body.result).toHaveProperty('meta');
      expect(resp.body.result).toHaveProperty('items');
    });
  });

  describe('/v1/users/u/:userId (GET)', () => {
    test('should get a user', async () => {
      const resp = await agent.get('/v1/users/u/1');

      expect(resp.status).toBe(200);
      expect(resp.body).toHaveProperty('status');
      expect(resp.body.status).toBe('success');
      expect(resp.body).toHaveProperty('result');
    });

    test('should not found a user', async () => {
      const resp = await agent.get('/v1/users/u/1111');

      expect(resp.status).toBe(404);
      expect(resp.body).toHaveProperty('status');
      expect(resp.body.status).toBe('error');
    });
  });

  describe('/v1/users/me (GET)', () => {
    test('should get me invalid token', async () => {
      const resp = await agent.get('/v1/users/me');

      expect(resp.status).toBe(401);
      expect(resp.body).toHaveProperty('status');
      expect(resp.body.status).toBe('error');
    });

    test('should get me', async () => {
      const resp = await agent.get('/v1/users/me').set('Authorization', `Bearer ${accessToken}`);

      expect(resp.status).toBe(200);
      expect(resp.body).toHaveProperty('status');
      expect(resp.body.status).toBe('success');
      expect(resp.body).toHaveProperty('result');
    });
  });

  describe('/v1/users/me (PATCH)', () => {
    test('should update me fail', async () => {
      const body = {};
      const resp = await agent
        .patch('/v1/users/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(body);

      expect(resp.status).toBe(422);
    });

    test('should fail update me', async () => {
      const body = {
        name: 'lorem ipsum dolor sit amet',
        birhtdate: '2000-12-21',
      };
      const resp = await agent
        .patch('/v1/users/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(body);

      expect(resp.status).toBe(204);
    });
  });

  describe('/v1/users/me/posts (GET)', () => {
    test('should get my post list pagination', async () => {
      const resp = await agent
        .get('/v1/users/me/posts')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(resp.status).toBe(200);
      expect(resp.body).toHaveProperty('status');
      expect(resp.body.status).toBe('success');
      expect(resp.body).toHaveProperty('result');
    });

    test('should not found user post list pagination', async () => {
      const resp = await agent
        .get('/v1/users/me/posts')
        .set('Authorization', `Bearer ${accessTokenNotFound}`);

      expect(resp.status).toBe(404);
      expect(resp.body).toHaveProperty('status');
      expect(resp.body.status).toBe('error');
    });
  });

  describe('/v1/users/me/comments (GET)', () => {
    test('should get my comment list pagination', async () => {
      const resp = await agent
        .get('/v1/users/me/comments')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(resp.status).toBe(200);
      expect(resp.body).toHaveProperty('status');
      expect(resp.body.status).toBe('success');
      expect(resp.body).toHaveProperty('result');
    });

    test('should not found user comment list pagination', async () => {
      const resp = await agent
        .get('/v1/users/me/comments')
        .set('Authorization', `Bearer ${accessTokenNotFound}`);

      expect(resp.status).toBe(404);
      expect(resp.body).toHaveProperty('status');
      expect(resp.body.status).toBe('error');
    });
  });
});
