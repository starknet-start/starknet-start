import { useStarkAddress } from "@starknet-start/react";
import { useState } from "react";
import stringify from "safe-stable-stringify";
import { DemoContainer } from "../starknet";
import { Input } from "../ui/input";

export function StarkAddress() {
  return (
    <DemoContainer hasWallet>
      <StarkAddressInner />
    </DemoContainer>
  );
}

function StarkAddressInner() {
  const [name, setName] = useState("vitalik.stark");

  const { data, isLoading, isPending, isError, error } = useStarkAddress({
    name,
  });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p>Starkname</p>
        <Input
          id="starkname"
          placeholder="vitalik.eth"
          className="mt-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <p>Response</p>
        <pre className="mt-1">
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
    </div>
  );
}
