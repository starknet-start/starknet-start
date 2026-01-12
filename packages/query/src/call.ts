import type { Chain } from "@starknet-start/chains";
import type { ArgsOrCalldata, BlockNumber, Contract } from "starknet";

export type CallQueryArgs = {
  functionName: string;
  args?: ArgsOrCalldata;
  blockIdentifier?: BlockNumber;
  parseArgs?: boolean;
  parseResult?: boolean;
};

export type CallQueryKeyParams = {
  chain?: Chain;
  contract?: Contract;
} & CallQueryArgs;

export type CallQueryFnParams = {
  contract?: Contract;
} & CallQueryArgs;

export function callQueryKey({
  chain,
  contract,
  functionName,
  args,
  blockIdentifier,
}: CallQueryKeyParams) {
  return [
    {
      entity: "readContract" as const,
      chainId: chain?.name,
      contract: contract?.address,
      functionName,
      args: JSON.stringify(args, (_, v) =>
        typeof v === "bigint" ? v.toString(10) : v,
      ),
      blockIdentifier,
    },
  ] as const;
}

export function callQueryFn({
  contract,
  functionName,
  args,
  blockIdentifier,
  parseArgs = true,
  parseResult = true,
}: CallQueryFnParams) {
  return async () => {
    if (!contract) throw new Error("contract is required");
    if (contract.functions[functionName] === undefined) {
      throw new Error(`function ${functionName} not found in contract`);
    }

    return await contract.call(functionName, args, {
      parseRequest: parseArgs,
      parseResponse: parseResult,
      blockIdentifier,
    });
  };
}
