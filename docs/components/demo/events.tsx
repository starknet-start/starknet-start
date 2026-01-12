import { useBlockNumber, useEvents, useNetwork } from "@starknet-start/react";
import stringify from "safe-stable-stringify";
import { BlockTag } from "starknet";
import { DemoContainer } from "../starknet";
import { Button } from "../ui/button";

function EventsInner() {
  const eventName = "Transfer";
  const { chain } = useNetwork();
  const address = chain.nativeCurrency.address;
  const blockNumber = useBlockNumber();
  const fromBlock = blockNumber.data ? blockNumber.data - 10 : 0;
  const toBlock = BlockTag.LATEST;

  const pageSize = 3;
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useEvents({ address, eventName, fromBlock, toBlock, pageSize });

  const response =
    status === "pending" ? (
      <p>Loading first events ...</p>
    ) : status === "error" ? (
      <>
        <p>Error: {error?.message}</p>
        <pre>{stringify({ data, error }, null, 2)}</pre>
      </>
    ) : (
      <>
        <div>
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more events ..."
              : hasNextPage
                ? "Load more events"
                : "No more events to load"}
          </Button>
        </div>

        {data?.pages
          .slice(0)
          .reverse()
          .map((page, i) => (
            <div key={page.continuation_token}>
              <p>Chunk: {data.pages.length - i}</p>
              <pre>{stringify({ page }, null, 2)}</pre>
            </div>
          ))}
      </>
    );

  return (
    <div className="flex flex-col gap-4">
      <p>Fetching events for</p>
      <pre>
        {stringify(
          { address, eventName, fromBlock, toBlock, pageSize },
          null,
          2,
        )}
      </pre>
      {response}
    </div>
  );
}

export function Events() {
  return (
    <DemoContainer hasWallet>
      <EventsInner />
    </DemoContainer>
  );
}
