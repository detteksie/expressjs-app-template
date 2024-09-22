import supertest, { Agent } from 'supertest';

import app from '|/app';
import { User } from '|/models/user.model';
import { createToken } from '|/utils/jwt.util';

describe('PostController (e2e)', () => {
  let agent: Agent;
  let accessToken: string;

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
  });

  describe('/v1/posts (POST)', () => {
    test('should create a post', async () => {
      const body = {
        title: 'lorem ipsum',
        content: 'dolor sit amet',
      };
      const resp = await agent
        .post('/v1/posts')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(body);

      expect(resp.status).toBe(201);
      expect(resp.body).toHaveProperty('status');
      expect(resp.body.status).toBe('success');
      expect(resp.body).toHaveProperty('result');
    });
  });

  describe('/v1/posts (GET)', () => {
    test('should post pagination success', async () => {
      const resp = await agent.get('/v1/posts').query({ page: 2, limit: 20 });

      expect(resp.status).toBe(200);
      expect(resp.body).toHaveProperty('status');
      expect(resp.body.status).toBe('success');
      expect(resp.body).toHaveProperty('result');
      expect(resp.body.result).toHaveProperty('items');
      expect(resp.body.result).toHaveProperty('meta');
    });
  });

  describe('/v1/posts/p/:postId (GET)', () => {
    test('should success get a post', async () => {
      const resp = await agent.get('/v1/posts/p/1');

      expect(resp.status).toBe(200);
      expect(resp.body).toHaveProperty('status');
      expect(resp.body.status).toBe('success');
      expect(resp.body).toHaveProperty('result');
    });
    test('should not found a post', async () => {
      const resp = await agent.get('/v1/posts/p/1111');

      expect(resp.status).toBe(404);
      expect(resp.body).toHaveProperty('status');
      expect(resp.body.status).toBe('error');
    });
  });

  describe('/v1/posts/p/:postId (PATCH)', () => {
    test('should update a post', async () => {
      const body = {
        title: 'lorem ipsum',
        content: 'dolor sit amet',
      };
      const resp = await agent
        .patch('/v1/posts/p/1')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(body);

      expect(resp.status).toBe(204);
    });
  });

  describe('/v1/posts/p/:postId (DELETE)', () => {
    test('should delete a post', async () => {
      const resp = await agent
        .delete('/v1/posts/p/2')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(resp.status).toBe(204);
    });
  });

  describe('/v1/posts/p/:postId/publish (PATCH)', () => {
    test('should update visibility of a post', async () => {
      const body = {
        isPublished: false,
      };
      const resp = await agent
        .patch('/v1/posts/p/1/publish')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(body);

      expect(resp.status).toBe(204);
    });
  });

  describe('/v1/posts/p/:postId/comments (POST)', () => {
    test('should add comment to a post', async () => {
      const body = {
        content: 'lorem ipsum dolor sit amet',
      };
      const resp = await agent
        .post('/v1/posts/p/1/comments')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(body);

      expect(resp.status).toBe(201);
      expect(resp.body).toHaveProperty('status');
      expect(resp.body.status).toBe('success');
      expect(resp.body).toHaveProperty('result');
    });
  });

  describe('/v1/posts/p/:postId/comments (GET)', () => {
    test('should add comment to a post', async () => {
      const resp = await agent
        .get('/v1/posts/p/1/comments')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(resp.status).toBe(200);
      expect(resp.body).toHaveProperty('status');
      expect(resp.body.status).toBe('success');
      expect(resp.body).toHaveProperty('result');
    });
  });
});
