import type { Address } from "@starknet-start/chains";
import type {
  Abi,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
  ExtractArgs,
  FunctionRet,
} from "abi-wan-kanabi/kanabi";
import type { BlockNumber } from "starknet";

import type { UseQueryProps, UseQueryResult } from "../query";

import { type CallQueryKey, type UseCallProps, useCall } from "./use-call";

type Result<
  TAbi extends Abi,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>,
> = FunctionRet<TAbi, TFunctionName>;

/** Options for `useReadContract`. */
export type UseReadContractProps<
  TAbi extends Abi,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>,
> = UseQueryProps<
  Result<TAbi, TFunctionName>,
  Error,
  Result<TAbi, TFunctionName>,
  ReturnType<CallQueryKey>
> & {
  /** The target contract's ABI.
   *
   * @remarks
   *
   * You must pass ABI as const
   *
   */
  abi?: TAbi;
  /** The target contract's address. */
  address?: Address;
  /** Refresh data at every block. */
  watch?: boolean;
  /** The contract's function name. */
  functionName: TFunctionName;
  /** Read arguments. */
  args?: ExtractArgs<TAbi, ExtractAbiFunction<TAbi, TFunctionName>>;
  /** Block identifier used when performing call. */
  blockIdentifier?: BlockNumber;
};

/** Value returned from `useReadContract`. */
export type UseReadContractResult<
  TAbi extends Abi,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>,
> = UseQueryResult<Result<TAbi, TFunctionName>, Error>;

/**
 * Perform a read-only contract call. If the specified block identifier is pending,
 * the hook will periodically refetch data automatically.
 *
 * @remarks
 *
 * - The hook only performs a call if the target `abi`, `address`,
 * `functionName`, and `args` are not undefined.
 *
 * - You must pass `abi` as `const` for autocomplete to work.
 */
export function useReadContract<
  TAbi extends Abi,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>,
>(props: UseReadContractProps<TAbi, TFunctionName>) {
  return useCall(props as UseCallProps) as UseReadContractResult<
    TAbi,
    TFunctionName
  >;
}
