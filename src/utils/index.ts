export const promiseHandler = <T, E = Error>(promise: Promise<T>) =>
  promise
    .then((res) => [res, null] as [T, null])
    .catch((err) => [null, err] as [null, E]);
