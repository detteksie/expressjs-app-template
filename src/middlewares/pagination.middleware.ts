import expressAsyncHandler from 'express-async-handler';

import { PaginationQuery, checkPaginationDefault } from '@/utils/pagination-query.util';

export const paginationMiddleware = () =>
  expressAsyncHandler<Record<string, string>, unknown, unknown, PaginationQuery>(
    (req, _res, next) => {
      // console.log('setting up pagination middleware');
      checkPaginationDefault(req.query);
      next();
    },
  );
