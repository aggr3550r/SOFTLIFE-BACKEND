import { Request } from 'express';
import { PaginateQuery } from 'nestjs-paginate';

export const extractPaginateQuery = (req: Request): PaginateQuery => {
  const { page, limit, q, sortBy, orderBy } = req.body;

  return {
    page: Number(page) ? Number(page) : 1,
    limit: Number(limit) ? Number(limit) : 20,
    sortBy: sortBy ? sortBy : ('created_at' as any),
    search: q || (null as any),
    filter: (({ q, page, limit, orderBy, sortBy, ...o }) => o)(
      req.query
    ) as any,
    path: req.path
  };
};
