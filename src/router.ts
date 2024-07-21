import { RequestHandler, Router } from 'express';

import { authRoutes } from './modules/routes/auth.routes';
import { commentRoutes } from './modules/routes/comment.routes';
import { postRoutes } from './modules/routes/post.routes';
import { userRoutes } from './modules/routes/user.routes';

export const router = Router();

/* GET home page. */
router.get('/', (async (_, res, __) => {
  res.render('index', { title: 'Express' });
}) as RequestHandler);

router.use('/', authRoutes);

router.use('/v1/users', userRoutes);
router.use('/v1/posts', postRoutes);
router.use('/v1/comments', commentRoutes);
