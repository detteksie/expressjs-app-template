import { RequestHandler, Router } from 'express';
import { authRoutes, commentRoutes, postRoutes, userRoutes } from './routes';

export const router = Router();

/* GET home page. */
router.get('/', (async (_, res, __) => {
  res.render('index', { title: 'Express' });
}) as RequestHandler);

router.use('/', authRoutes);

router.use('/v1/users', userRoutes);
router.use('/v1/posts', postRoutes);
router.use('/v1/comments', commentRoutes);
