import type {
  AccountInterface,
  BigNumberish,
  DeployContractResponse,
  InvocationsDetails,
  RawArgs,
} from "starknet";

export type DeployAccountVariables = {
  /** The class hash of the contract to deploy. */
  classHash?: string;
  /** The constructor arguments. */
  constructorCalldata?: RawArgs;
  /** Address salt. */
  addressSalt?: BigNumberish;
  /** Contract address. */
  contractAddress?: string;
  /** Transaction options. */
  options?: InvocationsDetails;
};

export function deployAccountMutationKey(
  props: { account?: AccountInterface } & Partial<DeployAccountVariables>,
) {
  return [{ entity: "deployAccount", ...props }] as const;
}

export function deployAccountMutationFn({
  account,
  classHash,
  constructorCalldata,
  addressSalt,
  contractAddress,
  options,
}: { account?: AccountInterface } & Partial<DeployAccountVariables>) {
  return async (): Promise<DeployContractResponse> => {
    if (!account) throw new Error("account is required");
    if (!classHash) throw new Error("classHash is required");
    return await account.deployAccount(
      { classHash, constructorCalldata, addressSalt, contractAddress },
      options,
    );
  };
}
