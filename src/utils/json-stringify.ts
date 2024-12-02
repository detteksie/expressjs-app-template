export type JsonStringify = (obj: Any, space?: number) => string;

export const jsonStringify: JsonStringify = (obj, space = 2) => JSON.stringify(obj, null, space);
