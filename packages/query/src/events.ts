import type { Address } from "@starknet-start/chains";
import {
  type BlockIdentifier as BlockIdentifier_,
  BlockTag,
  type EVENTS_CHUNK,
  hash,
  num,
  type RpcProvider,
} from "starknet";

const DEFAULT_PAGE_SIZE = 5;

type BlockIdentifier = Exclude<BlockIdentifier_, bigint>;

export type EventsQueryKeyParams = {
  address?: Address;
  eventName?: string;
  fromBlock?: BlockIdentifier;
  toBlock?: BlockIdentifier;
  pageSize?: number;
};

export type EventsQueryFnParams = {
  provider: RpcProvider;
} & EventsQueryKeyParams;

export function eventsQueryKey({
  address,
  eventName,
  fromBlock,
  toBlock,
  pageSize,
}: EventsQueryKeyParams) {
  return [
    {
      entity: "events" as const,
      address,
      eventName,
      fromBlock,
      toBlock,
      pageSize,
    },
  ] as const;
}

export function eventsQueryFn({
  provider,
  address,
  eventName,
  fromBlock,
  toBlock,
  pageSize,
}: EventsQueryFnParams) {
  const keyFilter = eventName
    ? [num.toHex(hash.starknetKeccak(eventName))]
    : [];
  const keys = [keyFilter];

  const fromBlockId = fromBlock
    ? blockIdentifierToBlockId(fromBlock)
    : undefined;

  const toBlockId = toBlock ? blockIdentifierToBlockId(toBlock) : undefined;
  const chunkSize = pageSize ? pageSize : DEFAULT_PAGE_SIZE;

  return async ({
    pageParam,
  }: {
    pageParam?: string;
  }): Promise<EVENTS_CHUNK> => {
    const res = await provider.getEvents({
      from_block: fromBlockId,
      to_block: toBlockId,
      address,
      keys,
      chunk_size: chunkSize,
      continuation_token: pageParam === "0" ? undefined : pageParam,
    });
    return res;
  };
}

function blockIdentifierToBlockId(blockIdentifier: BlockIdentifier) {
  if (blockIdentifier === null) {
    return BlockTag.PRE_CONFIRMED;
  }

  if (typeof blockIdentifier === "number") {
    return { block_number: blockIdentifier };
  }

  if (typeof blockIdentifier === "string") {
    if (blockIdentifier === "latest" || blockIdentifier === "pending") {
      return blockIdentifier as BlockTag;
    }

    return { block_hash: blockIdentifier };
  }

  throw new Error(
    `Unsupported BlockIdentifier type: ${typeof blockIdentifier}`,
  );
}
