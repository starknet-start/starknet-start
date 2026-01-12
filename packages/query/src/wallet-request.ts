import {
  StarknetWalletApi,
  type WalletWithStarknetFeatures,
} from "@starknet-io/get-starknet-wallet-standard/features";
import type { RpcMessage, RpcTypeToMessageMap } from "@starknet-io/types-js";

/** Message types for connector request call. */
export type RequestMessageTypes = RpcMessage["type"];

/** Result type of request call. */
export type RequestResult<T extends RequestMessageTypes> =
  RpcTypeToMessageMap[T]["result"];

/** Args type of request call. */
export type RequestArgs<T extends RequestMessageTypes> = Partial<{
  type: T;
  params: RpcTypeToMessageMap[T]["params"];
}>;

export function walletRequestMutationKey<T extends RequestMessageTypes>({
  type,
  params,
}: RequestArgs<T>) {
  return [{ entity: "walletRequest", type, params }] as const;
}

export function walletRequestMutationFn<T extends RequestMessageTypes>({
  connector,
}: {
  connector?: WalletWithStarknetFeatures;
}): (args: RequestArgs<T>) => Promise<RequestResult<T>> {
  return async ({
    type,
    params,
  }: RequestArgs<T>): Promise<RequestResult<T>> => {
    if (!connector) throw new Error("No connector connected");
    if (!type) throw new Error("Type is required");
    return await connector.features[StarknetWalletApi].request({
      type,
      params,
    });
  };
}
