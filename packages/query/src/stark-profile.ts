import type { Address } from "@starknet-start/chains";
import { CairoCustomEnum, cairo, hash, shortString } from "starknet";

export type StarkProfileQueryKeyParams = {
  address?: string;
  namingContract?: string;
  identityContract?: string;
  network?: string;
  useDefaultPfp?: boolean;
};

export type StarkProfileQueryFnParams = StarkProfileQueryKeyParams & {
  multicallContract?: MulticallContract;
};

export type StarkProfileResponse = {
  name?: string;
  profile?: string;
  profilePicture?: string;
  twitter?: string;
  github?: string;
  discord?: string;
  proofOfPersonhood: boolean;
};

type MulticallContract = {
  call: (method: string, params: unknown[]) => Promise<{ responses: bigint[] }>;
};

export type StarknetIdContracts = {
  identity: Address;
  naming: Address;
  verifier: Address;
  verifier_pop: Address;
  verifier_pfp: Address;
  multicall: Address;
};

export const STARKNET_ID_CONTRACTS: Record<string, StarknetIdContracts> = {
  mainnet: {
    identity:
      "0x010600c390695989731eef336ff6b3c1843f9b16a0b8d52bb6bfe9d41ed96965",
    naming:
      "0x06ac597f8116f886fa1c97a23fa4e08299975ecaf6b598873ca6792b9bbfb678",
    verifier:
      "0x02265a6dad1676e91f36d6d3139fb7154436cc4d0a4f4c398f8d2c2b465640c1",
    verifier_pop:
      "0x0640c1e6bc1036a728f6b33eb48fcd5d57e52bd9772b2cc1a2862ab674c41eee",
    verifier_pfp:
      "0x030ffa01fe336357448dfba17342310f1f0f769ab7628aa0ec70ff1a6e59e4b3",
    multicall:
      "0x03f62dcceae415a78030c4f8f478dbf3c4302e10cd0fdcc066c423c508e49269",
  },
  sepolia: {
    identity:
      "0x0493c4f52d301373d4cc45f764d98819fcbe2f9eca0bdc2886970ea308f025a7",
    naming: "0x0154bc2e1af9260b9e66af0e9c46fc757ff893b3ff6a85718a810baf1474",
    verifier:
      "0x06b6307c6f2160e9e507c8478a2de23c9118db9daf66d05be92af8efcf7f50be",
    verifier_pop:
      "0x04605a7aa2f50ee9b746fbdc3c19c4fa1bea1261d6ae0b1b8972cbabf7578d0a",
    verifier_pfp:
      "0x0732a6e74c958b8ce5fe40425d77f0d8fa2dd2379119665b78ab75540bd1b5a8",
    multicall:
      "0x05b33dcb162d432c50a6ce40685cc0612118803b0057d82a67fa73580f2d5d90",
  },
};

const keys: Record<string, string> = {
  twitter: "twitter",
  github: "github",
  discord: "discord",
  proofOfPersonhood: "proof_of_personhood",
};

export function starkProfileQueryKey({
  address,
  namingContract,
  identityContract,
  network,
  useDefaultPfp,
}: StarkProfileQueryKeyParams) {
  return [
    {
      entity: "starkprofile" as const,
      address,
      namingContract,
      identityContract,
      network,
      useDefaultPfp,
    },
  ] as const;
}

export function starkProfileQueryFn({
  address,
  useDefaultPfp,
  namingContract,
  identityContract,
  network,
  multicallContract,
}: StarkProfileQueryFnParams) {
  return async (): Promise<StarkProfileResponse> => {
    if (!address) throw new Error("address is required");
    if (!multicallContract) throw new Error("multicallContract is required");
    if (!network) throw new Error("network is required");

    const contracts = STARKNET_ID_CONTRACTS[network];
    if (!contracts) throw new Error("Network not supported");

    const identity = identityContract ?? contracts.identity;
    const naming = namingContract ?? contracts.naming;

    const data = await multicallContract.call("aggregate", [
      [
        {
          execution: staticExecution(),
          to: hardcoded(naming),
          selector: hardcoded(hash.getSelectorFromName("address_to_domain")),
          calldata: [hardcoded(address), hardcoded("0")],
        },
        {
          execution: staticExecution(),
          to: hardcoded(naming),
          selector: hardcoded(hash.getSelectorFromName("domain_to_id")),
          calldata: [arrayReference(0, 0)],
        },
        {
          execution: staticExecution(),
          to: hardcoded(identity),
          selector: hardcoded(hash.getSelectorFromName("get_verifier_data")),
          calldata: [
            reference(1, 0),
            hardcoded(shortString.encodeShortString(keys.twitter)),
            hardcoded(contracts.verifier as string),
            hardcoded("0"),
          ],
        },
        {
          execution: staticExecution(),
          to: hardcoded(identity),
          selector: hardcoded(hash.getSelectorFromName("get_verifier_data")),
          calldata: [
            reference(1, 0),
            hardcoded(shortString.encodeShortString(keys.github)),
            hardcoded(contracts.verifier as string),
            hardcoded("0"),
          ],
        },
        {
          execution: staticExecution(),
          to: hardcoded(identity),
          selector: hardcoded(hash.getSelectorFromName("get_verifier_data")),
          calldata: [
            reference(1, 0),
            hardcoded(shortString.encodeShortString(keys.discord)),
            hardcoded(contracts.verifier as string),
            hardcoded("0"),
          ],
        },
        {
          execution: staticExecution(),
          to: hardcoded(identity),
          selector: hardcoded(hash.getSelectorFromName("get_verifier_data")),
          calldata: [
            reference(1, 0),
            hardcoded(shortString.encodeShortString(keys.proofOfPersonhood)),
            hardcoded(contracts.verifier_pop as string),
            hardcoded("0"),
          ],
        },
        {
          execution: staticExecution(),
          to: hardcoded(identity),
          selector: hardcoded(hash.getSelectorFromName("get_verifier_data")),
          calldata: [
            reference(1, 0),
            hardcoded(shortString.encodeShortString("nft_pp_contract")),
            hardcoded(contracts.verifier_pfp as string),
            hardcoded("0"),
          ],
        },
        {
          execution: staticExecution(),
          to: hardcoded(identity),
          selector: hardcoded(
            hash.getSelectorFromName("get_extended_verifier_data"),
          ),
          calldata: [
            reference(1, 0),
            hardcoded(shortString.encodeShortString("nft_pp_id")),
            hardcoded("2"),
            hardcoded(contracts.verifier_pfp as string),
            hardcoded("0"),
          ],
        },
        {
          execution: notEqual(6, 0, 0),
          to: hardcoded(identity),
          selector: hardcoded(
            hash.getSelectorFromName("get_extended_verifier_data"),
          ),
          calldata: [
            reference(1, 0),
            hardcoded(shortString.encodeShortString("nft_pp_metadata")),
            hardcoded("2"),
            hardcoded(contracts.verifier_pfp as string),
            hardcoded("0"),
          ],
        },
      ],
    ]);

    const [
      ,
      domainToId,
      twitter,
      github,
      discord,
      proofOfPersonhood,
      nftContract,
      nftTokenId,
      nftMetadata,
    ] = data.responses;

    const decodedProofOfPersonhood = decodeProofOfPersonhood(proofOfPersonhood);
    const domain = decodeDomain(domainToId);
    const social = decodeSocials({ twitter, github, discord });

    const profilePicture = await buildProfilePictureUrl({
      nftContract,
      nftTokenId,
      nftMetadata,
      useDefaultPfp,
    });

    return {
      name: domain ?? undefined,
      profile: decodeProfileMetadata(nftMetadata),
      profilePicture,
      proofOfPersonhood: decodedProofOfPersonhood,
      ...social,
    };
  };
}

function decodeProofOfPersonhood(encoded: bigint) {
  if (encoded === BigInt(0)) {
    return false;
  }

  const proof = cairo.uint256(encoded);
  return Boolean(proof.low);
}

function decodeDomain(encoded: bigint) {
  const domain = shortString.decodeShortString(numToHex(encoded));
  return domain === "" ? undefined : domain;
}

function decodeProfileMetadata(encoded: bigint) {
  if (encoded === BigInt(0)) return undefined;
  return shortString.decodeShortString(numToHex(encoded));
}

function numToHex(value: bigint) {
  return `0x${value.toString(16)}`;
}

function decodeSocials({
  twitter,
  github,
  discord,
}: {
  twitter: bigint;
  github: bigint;
  discord: bigint;
}) {
  return {
    twitter: decodeVerifierData(twitter),
    github: decodeVerifierData(github),
    discord: decodeVerifierData(discord),
  };
}

function decodeVerifierData(data: bigint) {
  if (data === BigInt(0)) return undefined;

  // TODO: check if this is a correct way, as the old code was using older version of starknet.js and things were deprecated
  const decoded = shortString.decodeShortString(numToHex(data));
  return decoded === "" ? undefined : decoded;
}

function hardcoded(value: string) {
  return {
    Hardcoded: value,
  };
}

function reference(responseIndex: number, calldataIndex: number) {
  return {
    Reference: {
      response_index: responseIndex,
      calldata_index: calldataIndex,
    },
  };
}

function arrayReference(responseIndex: number, calldataIndex: number) {
  return {
    ArrayReference: {
      response_index: responseIndex,
      calldata_index: calldataIndex,
    },
  };
}

function staticExecution() {
  return new CairoCustomEnum({
    Static: {},
  });
}

function notEqual(
  responseIndex: number,
  calldataIndex: number,
  expected: number,
) {
  return new CairoCustomEnum({
    NotEqual: {
      arguments_indices: {
        calldata_index: calldataIndex,
        response_index: responseIndex,
      },
      expected_result: expected,
    },
  });
}

async function buildProfilePictureUrl({
  nftContract,
  nftTokenId,
  nftMetadata,
  useDefaultPfp,
}: {
  nftContract: bigint;
  nftTokenId: bigint;
  nftMetadata: bigint;
  useDefaultPfp?: boolean;
}) {
  if (!nftContract || !nftTokenId || !nftMetadata) {
    if (!useDefaultPfp) {
      return undefined;
    }
    return "https://api.starknet.id/pfs/default";
  }

  const contract = shortString.decodeShortString(numToHex(nftContract));
  const tokenId = shortString.decodeShortString(numToHex(nftTokenId));
  const metadata = shortString.decodeShortString(numToHex(nftMetadata));

  if (!contract || !tokenId || !metadata) return undefined;
  return `https://api.starknet.id/pfp/${contract}/${tokenId}/${metadata}`;
}
