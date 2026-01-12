import type {
  BlockNumber,
  GetBlockResponse,
  ProviderInterface,
} from "starknet";

export type BlockQueryKeyParams = {
  blockIdentifier: BlockNumber;
};

export type BlockQueryFnParams = {
  provider: ProviderInterface;
  blockIdentifier: BlockNumber;
};

export function blockQueryKey({ blockIdentifier }: BlockQueryKeyParams) {
  return [{ entity: "block" as const, blockIdentifier }] as const;
}

export function blockQueryFn({
  provider,
  blockIdentifier,
}: BlockQueryFnParams) {
  return async (): Promise<GetBlockResponse> =>
    await provider.getBlock(blockIdentifier);
}
