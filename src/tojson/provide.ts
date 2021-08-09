import { TO_JSON_FIELD, TRANSIENT_PROPERTIES_KEY } from "../constants";
import { nativeStringify, stringifyNonTransientProperties } from "../stringify";
import { Serializeable } from "../types";

export const provideToJSON = (target: Record<string, any>) => {
  target[TO_JSON_FIELD] = function (this: Serializeable) {
    const transientKeys = Reflect.getMetadata(TRANSIENT_PROPERTIES_KEY, target);
    const str = nativeStringify(this as never);
    const parsed = JSON.parse(str);
    return stringifyNonTransientProperties(parsed, transientKeys);
  };
};
