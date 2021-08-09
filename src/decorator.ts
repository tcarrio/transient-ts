import "reflect-metadata";
import {
  TRANSIENT_OVERRIDE_JSON_SET,
  TO_JSON_FIELD,
  TRANSIENT_PROPERTIES_KEY,
} from "./constants";
import { overrideToJSON, provideToJSON } from "./tojson";

function injectToJson(target: any): void {
  if (!target[TO_JSON_FIELD]) {
    provideToJSON(target);
  } else {
    overrideToJSON(target);
  }
}

export const transient = () => {
  return (
    target: any,
    propertyKey: string | symbol,
  ) => {
    const transientProperties =
      Reflect.getMetadata(TRANSIENT_PROPERTIES_KEY, target) || [];
    transientProperties.push(propertyKey);
    Reflect.defineMetadata(
      TRANSIENT_PROPERTIES_KEY,
      transientProperties,
      target
    );

    const hasOverriddenToJSON = Reflect.getMetadata(TRANSIENT_OVERRIDE_JSON_SET, target);
    if (hasOverriddenToJSON) {
      return;
    }

    injectToJson(target);
    Reflect.defineMetadata(TRANSIENT_OVERRIDE_JSON_SET, true, target);
  };
};
