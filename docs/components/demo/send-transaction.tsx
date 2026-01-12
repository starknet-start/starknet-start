import {
  useAccount,
  useContract,
  useNetwork,
  useSendTransaction,
} from "@starknet-start/react";
import stringify from "safe-stable-stringify";
import type { Abi } from "starknet";
import { DemoContainer } from "../starknet";
import { Button } from "../ui/button";

export function SendTransaction() {
  return (
    <DemoContainer hasWallet>
      <SendTransactionInner />
    </DemoContainer>
  );
}

function SendTransactionInner() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { contract } = useContract({
    abi,
    address: chain.nativeCurrency.address,
  });

  const { isError, error, send, data, isPending } = useSendTransaction({
    calls:
      contract && address
        ? [contract.populate("transfer", [address, 1n])]
        : undefined,
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
      <Button onClick={() => send()}>Send Transaction</Button>
    </div>
  );
}

const abi = [
  {
    type: "function",
    name: "transfer",
    state_mutability: "external",
    inputs: [
      {
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "amount",
        type: "core::integer::u256",
      },
    ],
    outputs: [],
  },
] as const satisfies Abi;
