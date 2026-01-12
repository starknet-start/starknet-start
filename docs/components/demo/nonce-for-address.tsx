import { useAccount, useNonceForAddress } from "@starknet-start/react";
import stringify from "safe-stable-stringify";
import { DemoContainer } from "../starknet";

export function NonceForAddress() {
  return (
    <DemoContainer hasWallet>
      <NonceForAddressInner />
    </DemoContainer>
  );
}

function NonceForAddressInner() {
  const { address } = useAccount();

  const { data, isLoading, isError, error, isPending } = useNonceForAddress({
    address,
  });

  return (
    <div className="flex flex-col gap-4">
      <pre>
        {stringify(
          {
            data,
            isLoading,
            isPending,
            isError,
            error: error?.message,
          },
          null,
          2,
        )}
      </pre>
    </div>
  );
}
