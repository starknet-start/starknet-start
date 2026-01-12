import { StarknetWalletApi } from "@starknet-io/get-starknet-core";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
} from "@starknet-start/react";
import { Button } from "../ui/button";

export function WalletBar() {
  const { address } = useAccount();

  return (
    <div className="w-full py-2 h-24 border-b border-primary">
      {address ? <ConnectedWallet address={address} /> : <ConnectWallet />}
    </div>
  );
}

function ConnectedWallet({ address }: { address: `0x${string}` }) {
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  return (
    <div className="h-full flex flex-col justify-center">
      <p className="font-medium">Connected Address: </p>
      <div className="flex flex-row items-center gap-4">
        <pre title={address}>
          {address.slice(0, 15)}...{address.slice(-15)}
        </pre>
        <pre title={chain.name}>
          {chain.name} | {chain.network}
        </pre>
        <Button
          size={"sm"}
          variant={"destructive"}
          className="flex-none"
          onClick={() => disconnect()}
        >
          Disconnect
        </Button>
      </div>
    </div>
  );
}

function ConnectWallet() {
  const { connectAsync, connectors, status } = useConnect();

  return (
    <div className="flex h-full items-center justify-between gap-4">
      <p className="font-medium flex-none">Connect Wallet </p>
      <div className="flex flex-row justify-start flex-wrap gap-2">
        {connectors.map((connector) => (
          <Button
            key={connector.features[StarknetWalletApi].id}
            onClick={async () => {
              await connectAsync({ connector });
            }}
            disabled={status === "pending"}
          >
            {connector.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
