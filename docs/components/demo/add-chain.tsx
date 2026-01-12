import { type UseAddChainArgs, useAddChain } from "@starknet-start/react";
import stringify from "safe-stable-stringify";
import { shortString } from "starknet";
import { DemoContainer } from "../starknet";
import { Button } from "../ui/button";

export function AddChain() {
  return (
    <DemoContainer hasWallet>
      <AddChainInner />
    </DemoContainer>
  );
}

function AddChainInner() {
  const chainData: UseAddChainArgs = {
    id: "ZORG",
    chain_id: shortString.encodeShortString("ZORG"),
    chain_name: "ZORG",
    rpc_urls: ["http://192.168.1.44:6060"],
    native_currency: {
      type: "ERC20",
      options: {
        address:
          "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        name: "ETHER",
        symbol: "ETH",
        decimals: 18,
      },
    },
  };
  const { isError, isPending, data, error, addChain } = useAddChain({
    params: chainData,
  });
  return (
    <div className="flex flex-col gap-4">
      <p>Chain to Add</p>
      <pre>{stringify(chainData, null, 2)}</pre>

      <p>Response</p>
      <pre>
        {stringify(
          {
            data,
            isPending,
            isError,
            error: error?.message,
          },
          null,
          2,
        )}
      </pre>

      <Button onClick={() => addChain()}>Add Chain</Button>
      <Button onClick={() => addChain(chainData)}>Add Chain (override)</Button>
      <p className="text-sm text-muted-foreground">
        Important: This does not work with Braavos wallet, as they don't support
        the API at the moment.
      </p>
    </div>
  );
}
