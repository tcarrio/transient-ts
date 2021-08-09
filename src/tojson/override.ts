import { TO_JSON_FIELD, TRANSIENT_PROPERTIES_KEY } from "../constants";
import { stringifyNonTransientProperties } from "../stringify";
import { Serializeable } from "../types";

/**
 * TODO: Remove toJSON override?
 * 
 * Various caveats, namely that properties and output
 * can be anything, not necessarily JSON even. The user
 * has already opted for custom handling.
 */
export function overrideToJSON(target: Record<string, any>) {
  const customToJSON = target[TO_JSON_FIELD];
  target[TO_JSON_FIELD] = function (this: Serializeable) {
    const transientKeys = Reflect.getMetadata(TRANSIENT_PROPERTIES_KEY, target);
    return stringifyNonTransientProperties(JSON.parse(customToJSON.bind(this)()), transientKeys);
  };
}