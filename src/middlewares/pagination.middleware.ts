import expressAsyncHandler from 'express-async-handler';
import { PaginationQuery, checkPaginationDefault } from '~/utils/pagination-query.util';

export const paginationMiddleware = expressAsyncHandler<any, any, any, PaginationQuery>(
  async (req, res, next) => {
    console.log('setting up pagination middleware');
    checkPaginationDefault(req.query);
    next();
  },
);
