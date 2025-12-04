import * as json from "lossless-json";

/**
 * Convert JSON object to JSON string
 *
 * NOTE: the not-null assertion is used so the return type conforms to JSON.stringify()
 * which can also return undefined but is not represented in the default typing
 *
 * @param value JSON object
 * @param [replacer] Function that alters the behavior of the stringification process
 * @param [space] Used to insert white space into the output JSON string
 * @param [numberStringifiers] Function used to stringify numbers (returning undefined will delete the property from the object)
 * @return {string} JSON string
 * @example
 * ```typescript
 * const value = [123, 12.3, 1234567890];
 * const result = stringify(value);
 * // result = '[123,12.3,1234567890]'
 * ```
 */
export const stringify = (
  value: unknown,
  // biome-ignore lint/suspicious/noExplicitAny: <>
  replacer?: any,
  space?: string | number | undefined,
  numberStringifiers?: json.NumberStringifier[] | undefined,
  // biome-ignore lint/style/noNonNullAssertion: <>
): string => json.stringify(value, replacer, space, numberStringifiers)!;
