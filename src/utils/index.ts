export const promiseHandler = <T, E = Error>(promise: Promise<T>) =>
  promise
    .then((res) => [res, null] as [T, null])
    .catch((err) => [null, err] as [null, E]);

export const dependOn = <T, R>(
  dependency: T | undefined,
  queryFn: (dependency: T) => Promise<R>
): (() => Promise<R>) => {
  return typeof dependency === 'undefined'
    ? () => Promise.reject(new Error('Dependency not passed to query'))
    : () => queryFn(dependency);
};
