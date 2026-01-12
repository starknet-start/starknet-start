import { type Address, useStarkProfile } from "@starknet-start/react";
import { useState } from "react";
import stringify from "safe-stable-stringify";
import { DemoContainer } from "../starknet";
import { Input } from "../ui/input";

export function StarkProfile() {
  return (
    <DemoContainer hasWallet>
      <StarkProfileInner />
    </DemoContainer>
  );
}

function StarkProfileInner() {
  const [address, setAddress] = useState(
    "0x061b6c0a78f9edf13cea17b50719f3344533fadd470b8cb29c2b4318014f52d3",
  );

  const { data, isLoading, isError, isPending, error } = useStarkProfile({
    address: address as Address,
  });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p>Address</p>
        <Input
          placeholder="0x7cffe72748da43594c5924129b4f18bffe643270a96b8760a6f2e2db49d9732"
          className="mt-1"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />{" "}
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
