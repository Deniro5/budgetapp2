export function cloneDeep<T>(obj: T): T {
  if (typeof obj !== "object" || obj === null) {
    // Return primitives and null as is
    return obj;
  }

  if (Array.isArray(obj)) {
    // Clone arrays
    return obj.map((item) => cloneDeep(item)) as unknown as T;
  }

  // Clone objects
  const clonedObj: Partial<T> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = cloneDeep(obj[key]);
    }
  }
  return clonedObj as T;
}
 