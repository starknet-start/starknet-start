import { useNetwork, useReadContract } from "@starknet-start/react";
import { useState } from "react";
import stringify from "safe-stable-stringify";
import { BlockTag } from "starknet";
import { DemoContainer } from "../starknet";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function ReadContractInner() {
  const [blockIdentifier, setBlockIdentifier] = useState("latest");
  const [enable, setEnable] = useState(false);
  const { chain } = useNetwork();

  const { data, refetch, fetchStatus, status } = useReadContract({
    abi: [
      {
        name: "symbol",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::felt252",
          },
        ],
        state_mutability: "view",
      },
    ] as const,
    functionName: "symbol",
    address: chain.nativeCurrency.address,
    args: [],
    watch: true,
    enabled: enable,
    blockIdentifier:
      blockIdentifier === "latest" ? BlockTag.LATEST : BlockTag.PRE_CONFIRMED,
  });

  return (
    <div className="flex flex-col gap-4">
      <Select
        onValueChange={(value) => setBlockIdentifier(value)}
        value={blockIdentifier}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Block Identifier" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={BlockTag.LATEST}>Latest</SelectItem>
          <SelectItem value={BlockTag.PRE_CONFIRMED}>Pre-Confirmed</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="enable"
          checked={enable}
          onCheckedChange={() => {
            setEnable((prev) => !prev);
          }}
        />
        <label
          htmlFor="enable"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Enable Query
        </label>
      </div>
      <p>Response</p>
      <pre>
        {stringify(
          {
            data: data ?? "No Data",
            blockIdentifier,
            fetchStatus,
            status,
            enabled: enable,
          },
          null,
          2,
        )}
      </pre>

      <Button onClick={() => refetch()}>Refetch data</Button>
    </div>
  );
}

export function ReadContract() {
  return (
    <DemoContainer>
      <ReadContractInner />
    </DemoContainer>
  );
}
