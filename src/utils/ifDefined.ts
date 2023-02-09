export function ifDefined(obj: object) {
  return Object.entries(obj)
    .filter(([, value]) => value)
    .reduce(
      (subObj, [key, value]) => ({
        ...subObj,
        [key]: value,
      }),
      {},
    )
}
