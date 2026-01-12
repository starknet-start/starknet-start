import {
  type Abi,
  useAccount,
  useContract,
  useEstimateFees,
  useNetwork,
} from "@starknet-start/react";
import stringify from "safe-stable-stringify";
import { DemoContainer } from "../starknet";

export function EstimateFees() {
  return (
    <DemoContainer hasWallet>
      <EstimateFeesInner />
    </DemoContainer>
  );
}

function EstimateFeesInner() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { contract } = useContract({
    abi: abi,
    address: chain.nativeCurrency.address,
  });

  const { data, isError, isLoading, isPending, error } = useEstimateFees({
    calls:
      contract && address
        ? [contract.populate("transfer", [address, 1n])]
        : undefined,
  });

  return (
    <div className="flex flex-col gap-4">
      <p>Calls</p>
      <pre>[contract.populate("transfer", [address, 1n])]</pre>

      <p>Response</p>
      <pre>
        {stringify(
          {
            data,
            isLoading,
            isPending,
            isError,
            error: error?.message,
            suggestedMaxFee: `${formatAmount(
              data?.overall_fee,
              chain.nativeCurrency.decimals,
            )} ${chain.nativeCurrency.symbol}`,
          },
          null,
          2,
        )}
      </pre>
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

const formatAmount = (
  unformattedAmount: bigint | unknown,
  decimals: number,
) => {
  return Number(BigInt(unformattedAmount?.toString() || 0)) / 10 ** decimals;
};
