import type { Address } from "@starknet-start/chains";
import type { Abi } from "abi-wan-kanabi";
import type {
  ContractFunctions,
  ContractFunctionsPopulateTransaction,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
  ExtractArgs,
  FunctionRet,
} from "abi-wan-kanabi/kanabi";
import type { Call, CallOptions, Contract, ProviderInterface } from "starknet";

// did this because "Omit" wont work directly over an abstract class
type Contract_ = {
  [K in keyof Contract as K extends "populate" | "populateTransaction" | "call"
    ? never
    : K]: Contract[K];
};

type ArgsArray_<
  TAbi extends Abi,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>,
> = ExtractArgs<TAbi, ExtractAbiFunction<TAbi, TFunctionName>>;

// with reference to 'abi-wan-kanabi' but with args accepting only array type
type TypedContractActions_<TAbi extends Abi> = {
  call<TFunctionName extends ExtractAbiFunctionNames<TAbi>>(
    method: TFunctionName,
    args?: ArgsArray_<TAbi, TFunctionName>,
    options?: CallOptions,
  ): Promise<FunctionRet<TAbi, TFunctionName>>;
  populate<TFunctionName extends ExtractAbiFunctionNames<TAbi>>(
    method: TFunctionName,
    args?: ArgsArray_<TAbi, TFunctionName>,
  ): Call;
  populateTransaction: ContractFunctionsPopulateTransaction<TAbi>;
  /**
   * Returns same contract but typed and with the applied options for the next call.
   * @note if using `contract.withOptions(...).methodName()`, you must NOT pass options again in the `methodName(...argsOfMethodOnly)` as an argument.
   * @important You must apply the options again for each call
   */
  withOptions(options: CallOptions): StarknetTypedContract<TAbi>;
};

type TypedContract_<TAbi extends Abi> = TypedContractActions_<TAbi> &
  ContractFunctions<TAbi>;

export type StarknetTypedContract<TAbi extends Abi> = TypedContract_<TAbi> &
  Contract_;

/** Arguments for `useContract`. */
export interface UseContractArgs<TAbi extends Abi> {
  /** The contract abi
   * @remarks
   *
   * You must pass ABI as a const
   *
   * @example
   * abi: [
   *   {
   *     type: "function",
   *     name: "fn_simple_array",
   *     inputs: [
   *       {
   *         name: "arg",
   *         type: "core::array::Array::<core::integer::u8>",
   *       },
   *     ],
   *     outputs: [],
   *     state_mutability: "view",
   *   }
   *  ] as const
   *
   */
  abi?: TAbi;
  /** The contract address. */
  address?: Address;
  /** The provider, by default it will be the current one. */
  provider?: ProviderInterface | null;
}

/** Value returned from `useContract`. */
export interface UseContractResult<TAbi extends Abi> {
  /** The contract. */
  contract?: StarknetTypedContract<TAbi>;
}
