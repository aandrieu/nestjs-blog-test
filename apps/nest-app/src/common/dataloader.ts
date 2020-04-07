import DataLoader = require('dataloader');

type CacheKeyFn<K> = (key: K) => any;

interface CreateDataLoaderOptions<K> {
  indexField?: string;
  cacheKeyFn?: CacheKeyFn<K>;
  preserveDuplicates?: boolean;
}

const indexAsCollectionResults = <K, V>(
  results: ReadonlyArray<V>,
  indexField: string,
) => {
  const indexedResults = new Map();
  results.forEach(res => {
    const cacheKey = res[indexField];
    if (indexedResults.has(cacheKey)) {
      const elem = indexedResults.get(cacheKey);
      indexedResults.set(cacheKey, elem.push(res));
    } else {
      indexedResults.set(cacheKey, [res]);
    }
  });
  return indexedResults;
};

const indexResults = <K, V>(results: ReadonlyArray<V>, indexField: string) => {
  const indexedResults = new Map();
  results.forEach(res => {
    const cacheKey = res[indexField];
    indexedResults.set(cacheKey, res);
  });
  return indexedResults;
};

const normalizeResults = <K, V>(
  keys: ReadonlyArray<K>,
  indexField: string,
  cacheKeyFn: CacheKeyFn<K>,
  preserveDuplicates: boolean,
) => {
  return (results: ReadonlyArray<V>) => {
    let indexedResults;
    let defaultValue;
    if (preserveDuplicates) {
      indexedResults = indexAsCollectionResults(results, indexField);
      defaultValue = [];
    } else {
      indexedResults = indexResults(results, indexField);
      defaultValue = null;
    }
    return keys.map(key => indexedResults.get(cacheKeyFn(key)) ?? defaultValue);
  };
};

export const createDataLoader = <K, V>(
  batchLoadFn: DataLoader.BatchLoadFn<K, V>,
  options?: CreateDataLoaderOptions<K>,
) => {
  const indexField = options?.indexField ?? 'id';
  const cacheKeyFn = options?.cacheKeyFn ?? (key => key);
  const preserveDuplicates = options?.preserveDuplicates ?? false;

  return new DataLoader<K, V>(keys => {
    return batchLoadFn(keys).then(
      normalizeResults(keys, indexField, cacheKeyFn, preserveDuplicates),
    );
  });
};
