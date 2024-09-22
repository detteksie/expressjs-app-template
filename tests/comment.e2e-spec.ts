import supertest, { Agent } from 'supertest';

import app from '|/app';
import { User } from '|/models/user.model';
import { createToken } from '|/utils/jwt.util';

describe('CommentController (e2e)', () => {
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

  describe('/v1/comments/c/:commentId (PATCH)', () => {
    test('should update a comment', async () => {
      const body = {
        content: 'lorem ipsum',
      };
      const resp = await agent
        .patch('/v1/comments/c/2')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(body);

      expect(resp.status).toBe(204);
    });
  });

  describe('/v1/comments/c/:commentId/hide (PATCH)', () => {
    test('should update visibility of a comment', async () => {
      const body = { hidden: true };
      const resp = await agent
        .patch('/v1/comments/c/2/hide')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(body);

      expect(resp.status).toBe(204);
    });
  });

  describe('/v1/comments/c/:commentId (DELETE)', () => {
    test('should delete a comment', async () => {
      const resp = await agent
        .delete('/v1/comments/c/4')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(resp.status).toBe(204);
    });
  });
});
