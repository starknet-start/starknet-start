import type { Address } from "@starknet-start/chains";
import { validateAndParseAddress } from "starknet";

/**
 * Validate and format the address.
 *
 * @param address - The address string to validate.
 * @returns The validated and formatted address as Address type.
 */
export function getAddress(address: string): Address {
  return validateAndParseAddress(address) as Address;
}
