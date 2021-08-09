import { TO_JSON_FIELD } from "./constants";

/**
 * Provides an override for stringifying an object that may provide
 * an override toJSON implementation
 *
 * @param input object
 * @returns string
 */
export function nativeStringify(input: object): string {
  return JSON.stringify(
    Object.keys(input)
      .filter((key) => key !== TO_JSON_FIELD)
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: input[key as never],
        };
      }, {})
  );
}

export function stringifyNonTransientProperties(output: object, keys: string[]): string {
  const keySet = new Set(keys);
  return JSON.stringify(
    Object.keys(output).reduce((map, key) => {
      const extraFields = keySet.has(key)
        ? {}
        : { [key]: output[key as never] }; //?
      return {
        ...map,
        ...extraFields,
      };
    }, {})
  );
}