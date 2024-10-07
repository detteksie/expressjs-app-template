import { RequestHandler, Router } from 'express';

import { authRoutes } from './modules/routes/auth.routes';
import { commentRoutes } from './modules/routes/comment.routes';
import { postRoutes } from './modules/routes/post.routes';
import { todoRoutes } from './modules/routes/todo.routes';
import { userRoutes } from './modules/routes/user.routes';

export const router = Router();

/* GET home page. */
router.get('/', (async (req, res) => {
  res.render('index', { title: 'Express' });
}) satisfies RequestHandler);

router.use('/', authRoutes);

router.use('/v1/users', userRoutes);
router.use('/v1/posts', postRoutes);
router.use('/v1/comments', commentRoutes);
router.use('/v1/todos', todoRoutes);
