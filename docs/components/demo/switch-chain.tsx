import { sepolia } from "@starknet-start/chains";
import { useNetwork, useSwitchChain } from "@starknet-start/react";
import stringify from "safe-stable-stringify";
import { constants } from "starknet";
import { DemoContainer } from "../starknet";
import { Button } from "../ui/button";

export function SwitchChain() {
  return (
    <DemoContainer hasWallet>
      <SwitchChainInner />
    </DemoContainer>
  );
}

function SwitchChainInner() {
  const { chain } = useNetwork();
  const { isError, isPending, data, error, switchChain } = useSwitchChain({
    params: {
      chainId:
        chain.id === sepolia.id
          ? constants.StarknetChainId.SN_MAIN
          : constants.StarknetChainId.SN_SEPOLIA,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <p>Current Chain:</p>
      <pre>
        {chain.name} | {chain.id.toString()} | {chain.network}
      </pre>

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

      <Button onClick={() => switchChain()}>
        Switch Chain between Mainnet and Sepolia
      </Button>
      <Button
        onClick={() =>
          switchChain({ chainId: constants.StarknetChainId.SN_MAIN })
        }
      >
        Switch to Mainnet (Override)
      </Button>
      <Button
        onClick={() =>
          switchChain({ chainId: constants.StarknetChainId.SN_SEPOLIA })
        }
      >
        Switch to Sepolia (Override)
      </Button>

      <p className="text-sm text-muted-foreground">
        Important: This does not work with Braavos wallet, as they don't support
        the API at the moment.
      </p>
    </div>
  );
}
