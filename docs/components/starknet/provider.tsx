import { mainnet, sepolia } from "@starknet-start/chains";
import type { ExplorerFactory } from "@starknet-start/explorers";
import { publicProvider } from "@starknet-start/providers";
import { StarknetConfig } from "@starknet-start/react";

export function StarknetProvider({
  defaultChainId,
  children,
  explorer,
}: {
  children: React.ReactNode;
  defaultChainId?: bigint;
  explorer?: ExplorerFactory;
}) {
  const chains = [sepolia, mainnet];

  const provider = publicProvider();

  return (
    <StarknetConfig
      chains={chains}
      provider={provider}
      explorer={explorer}
      defaultChainId={defaultChainId}
    >
      {children}
    </StarknetConfig>
  );
}
