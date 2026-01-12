import { useWalletRequest } from "@starknet-start/react";
import stringify from "safe-stable-stringify";
import { DemoContainer } from "../starknet";
import { Button } from "../ui/button";

export function WalletPermission() {
  return (
    <DemoContainer hasWallet>
      <WalletRequest />
    </DemoContainer>
  );
}

function WalletRequest() {
  const { request, data, isPending, isError, error } = useWalletRequest({
    type: "wallet_getPermissions",
  });

  return (
    <div className="flex flex-col gap-4">
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

      <Button onClick={() => request()}>Request Wallet Permissions</Button>
      <i className="text-xs mt-2">* Wallet connection required</i>
    </div>
  );
}
