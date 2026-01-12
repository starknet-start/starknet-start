import type { PaymasterInterface, TokenData } from "starknet";

export type PaymasterGasTokensQueryFnParams = {
  paymasterProvider?: PaymasterInterface;
};

export function paymasterGasTokensQueryKey() {
  return [
    {
      entity: "paymaster_gasTokens" as const,
    },
  ] as const;
}

export function paymasterGasTokensQueryFn({
  paymasterProvider,
}: PaymasterGasTokensQueryFnParams) {
  return async (): Promise<TokenData[]> => {
    if (!paymasterProvider) throw new Error("PaymasterProvider is required");
    return await paymasterProvider.getSupportedTokens();
  };
}
