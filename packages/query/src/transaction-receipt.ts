import type { Chain } from "@starknet-start/chains";
import type {
  GetTransactionReceiptResponse,
  ProviderInterface,
} from "starknet";

export type TransactionReceiptQueryKeyParams = {
  chain?: Chain;
  hash?: string;
};

export type TransactionReceiptQueryFnParams = {
  provider: ProviderInterface;
  hash?: string;
};

export function transactionReceiptQueryKey({
  chain,
  hash,
}: TransactionReceiptQueryKeyParams) {
  return [
    { entity: "transactionReceipt" as const, chainId: chain?.name, hash },
  ] as const;
}

export function transactionReceiptQueryFn({
  provider,
  hash,
}: TransactionReceiptQueryFnParams) {
  return async (): Promise<GetTransactionReceiptResponse> => {
    if (!hash) throw new Error("hash is required");

    return await provider.getTransactionReceipt(hash);
  };
}
