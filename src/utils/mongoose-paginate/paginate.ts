import mongoose from 'mongoose';

import {
  IPaginationMeta,
  IPaginationOptions,
  ObjectLiteral,
  // PaginationTypeEnum,
  // TypeORMCacheType,
  createPaginationObject,
  resolveOptions,
} from '../paginate';

export async function mongoosePaginate<T, CustomMetaType extends ObjectLiteral = IPaginationMeta>(
  query: mongoose.Query<T[], T>,
  options: IPaginationOptions<CustomMetaType>,
) {
  // const [page, limit, route, countQueries, cacheOption] = resolveOptions(options);
  const [page, limit, route, countQueries] = resolveOptions(options);

  const promises: [Promise<T[]>, Promise<number> | undefined] = [
    query
      .clone()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec(),
    undefined,
  ];
  if (countQueries) {
    promises[1] = query.clone().countDocuments();
  }

  const [items, total] = await Promise.all(promises);

  return createPaginationObject<T, CustomMetaType>({
    items,
    totalItems: total,
    currentPage: page,
    limit,
    route,
    metaTransformer: options.metaTransformer,
    routingLabels: options.routingLabels,
  });
}
