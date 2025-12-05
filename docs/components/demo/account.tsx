import { useAccount } from "@starknet-start/react";
import { StarknetWalletApi } from "@starknet-start/react/get-starknet";
import stringify from "safe-stable-stringify";
import { DemoContainer } from "../starknet";

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
