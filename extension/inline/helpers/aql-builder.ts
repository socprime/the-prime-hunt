import { clearExtraSpaces, clearLineBreaks, sortNumbers } from '../../../common/helpers';

type ParseQueryString = {
  select: string;
  where?: string;
  from?: string;
  last?: string;
  start?: string;
  stop?: string;
  limit?: string;
  like?: string;
  'order by'?: string;
  'group by'?: string;
  having?: string;
  ilike?: string;
};

export const parseQueryString = (query: string): ParseQueryString => {
  const normalizedQuery = clearExtraSpaces(
    clearLineBreaks(query),
  ).trim();

  const { indexes, mappedIndexes } = [
    'select',
    'where',
    'from',
    'last',
    'start',
    'stop',
    'limit',
    'like',
    'order by',
    'group by',
    'having',
    'ilike',
  ].reduce((result, predicate) => {
    const index = normalizedQuery.search(
      new RegExp(
        `${predicate === 'select' ? '^' : '(\\s|\\t)'}${predicate}(\\s|\\t)`,
        'gi',
      ),
    );
    if (index > -1) {
      result.indexes.add(index);
      result.mappedIndexes.set(index, predicate);
    }
    return result;
  }, {
    indexes: new Set(),
    mappedIndexes: new Map(),
  } as {
    indexes: Set<number>;
    mappedIndexes: Map<number, string>;
  });

  const sortedIndexes = Array.from(indexes).sort(sortNumbers);

  return sortedIndexes.reduce((r, index, i) => {
    const predicate = mappedIndexes.get(index)!;
    const startIndex = index;
    const endIndex = sortedIndexes[i + 1] || normalizedQuery.length;
    (r as any)[predicate] = normalizedQuery.substring(startIndex, endIndex)
      .replace(new RegExp(predicate, 'gi'), '')
      .trim();
    return r;
  }, {} as ParseQueryString);
};

export const addWhere = (
  currentWhere: string,
  addingWhere: string,
  separator: string,
): string => {
  return currentWhere.length < 1
    ? addingWhere
    : `(${currentWhere}) ${separator} ${addingWhere}`;
};

export const buildNewQuery = (parsedQuery: ParseQueryString): string => {
  let result = `SELECT ${parsedQuery.select}`;

  if (parsedQuery.from) {
    result += ` FROM ${parsedQuery.from}`;
  }

  if (parsedQuery.where) {
    result += ` WHERE ${parsedQuery.where}`;
  }

  if (parsedQuery['group by']) {
    result += ` GROUP BY ${parsedQuery['group by']}`;
  }

  if (parsedQuery.having) {
    result += ` HAVING ${parsedQuery.having}`;
  }

  if (parsedQuery['order by']) {
    result += ` ORDER BY ${parsedQuery['order by']}`;
  }

  if (parsedQuery.like) {
    result += ` LIKE ${parsedQuery.like}`;
  }

  if (parsedQuery.ilike) {
    result += ` ILIKE ${parsedQuery.ilike}`;
  }

  if (parsedQuery.limit) {
    result += ` LIMIT ${parsedQuery.limit}`;
  }

  if (parsedQuery.last) {
    result += ` LAST ${parsedQuery.last}`;
  }

  if (parsedQuery.start) {
    result += ` START ${parsedQuery.start}`;
  }

  if (parsedQuery.stop) {
    result += ` STOP ${parsedQuery.stop}`;
  }

  return result;
};
