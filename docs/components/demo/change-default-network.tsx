import { type Chain, mainnet, sepolia } from "@starknet-start/chains";
import { useAccount, useNetwork } from "@starknet-start/react";
import { useState } from "react";
import { DemoContainer } from "../starknet";
import { Button } from "../ui/button";

export function ChangeDefaultNetwork() {
  const [defaultChain, setDefaultChain] = useState<Chain>(sepolia);

  return (
    <DemoContainer hasWallet defaultChainId={defaultChain.id}>
      <ChangeNetworkInner
        defaultChain={defaultChain}
        setDefaultChain={setDefaultChain}
      />
    </DemoContainer>
  );
}

function ChangeNetworkInner({
  defaultChain,
  setDefaultChain,
}: {
  defaultChain: Chain;
  setDefaultChain: (chain: Chain) => void;
}) {
  const { chain } = useNetwork();
  const chains = [sepolia, mainnet];
  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col gap-4">
      <div className="h-full flex flex-col justify-center">
        <p className="font-medium">Current Chain: </p>
        <pre>{chain.name}</pre>
      </div>

      <div className="h-full flex flex-col justify-center">
        <p className="font-medium">Default Chain: </p>
        <pre>{defaultChain.name}</pre>
      </div>

      <div>
        <p className="font-medium">Change Default Chain:</p>
        <div className="flex gap-2 my-2">
          {chains.map((chain) => (
            <Button
              key={chain.id}
              onClick={() => setDefaultChain(chain)}
              variant={defaultChain.id === chain.id ? "default" : "outline"}
            >
              {chain.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-full flex flex-col justify-center">
        <p className="font-medium">Behavior Explanation: </p>
        <pre>
          {isConnected
            ? "Connected: Changing default chain won't affect current chain"
            : "Not Connected: Changing default chain will update current chain"}
        </pre>
      </div>
    </div>
  );
}
