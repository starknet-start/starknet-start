import { usePaymasterGasTokens } from "@starknet-start/react";
import stringify from "safe-stable-stringify";
import { DemoContainer } from "../starknet";

export function PaymasterGasTokens() {
  return (
    <DemoContainer>
      <PaymasterGasTokensInner />
    </DemoContainer>
  );
}

function PaymasterGasTokensInner() {
  const { data, isLoading, isError, error, isPending } =
    usePaymasterGasTokens();

  return (
    <div className="flex flex-col gap-4">
      <p>Response</p>
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
