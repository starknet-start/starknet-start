import { type QueryKey, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useBlockNumber } from "./use-block-number";

/**
 * Invalidate the given query on every new block.
 */
export function useInvalidateOnBlock({
  enabled = true,
  queryKey,
}: {
  enabled?: boolean;
  queryKey: QueryKey;
}) {
  const queryClient = useQueryClient();

  const [prevBlockNumber, setPrevBlockNumber] = useState<number | undefined>();

  const { data: blockNumber } = useBlockNumber({
    enabled,
  });

  useEffect(() => {
    if (!prevBlockNumber) {
      return setPrevBlockNumber(blockNumber);
    }

    if (blockNumber !== prevBlockNumber) {
      queryClient.invalidateQueries({ queryKey }, { cancelRefetch: false });
      return setPrevBlockNumber(blockNumber);
    }
  }, [blockNumber, prevBlockNumber, queryKey, queryClient]);
}
