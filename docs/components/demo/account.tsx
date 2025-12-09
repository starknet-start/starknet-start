import {
  StarknetInjectedWallet,
  StarknetWalletApi,
} from "@starknet-io/get-starknet-core";
import { useAccount } from "@starknet-start/react";
import stringify from "safe-stable-stringify";
import { DemoContainer } from "../starknet";

StarknetInjectedWallet;
export function Account() {
  return (
    <DemoContainer hasWallet>
      <AccountInner />
    </DemoContainer>
  );
}

function AccountInner() {
  const { address, connector } = useAccount();

  return (
    <div className="flex flex-col gap-4">
      <pre>
        {stringify(
          {
            address: address ?? "Connect wallet first",
            connector:
              connector?.features[StarknetWalletApi].id ??
              "Connect wallet first",
          },
          null,
          2,
        )}
      </pre>
    </div>
  );
}
