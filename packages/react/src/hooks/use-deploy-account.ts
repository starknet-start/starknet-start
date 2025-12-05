import {
  type DeployAccountVariables,
  deployAccountMutationFn,
  deployAccountMutationKey,
} from "@starknet-start/query";
import { useStarknetAccount } from "src/context/account";
import type { DeployContractResponse } from "starknet";
import {
  type UseMutationProps,
  type UseMutationResult,
  useMutation,
} from "../query";

export type { DeployAccountVariables };

export type UseDeployAccountProps = DeployAccountVariables &
  UseMutationProps<DeployContractResponse, Error, DeployAccountVariables>;

type MutationResult = UseMutationResult<
  DeployContractResponse,
  Error,
  DeployAccountVariables
>;

export type UseDeployAccountResult = Omit<
  MutationResult,
  "mutate" | "mutateAsync"
> & {
  /** Deploy account. */
  deployAccount: MutationResult["mutate"];

  /** Deploy account. */
  deployAccountAsync: MutationResult["mutateAsync"];
};

/**
 * Hook for deploying a contract.
 *
 * @remarks
 *
 * This hook deploys a new contract from the currently connected account.
 */
export function useDeployAccount({
  classHash,
  constructorCalldata,
  addressSalt,
  contractAddress,
  options,
  ...props
}: UseDeployAccountProps): UseDeployAccountResult {
  const { account } = useStarknetAccount();
  const { mutate, mutateAsync, ...result } = useMutation({
    mutationKey: deployAccountMutationKey({
      account,
      classHash,
      constructorCalldata,
      addressSalt,
      contractAddress,
      options,
    }),
    mutationFn: deployAccountMutationFn({
      account,
      classHash,
      constructorCalldata,
      addressSalt,
      contractAddress,
      options,
    }),
    ...props,
  });

  return {
    deployAccount: mutate,
    deployAccountAsync: mutateAsync,
    ...result,
  };
}
