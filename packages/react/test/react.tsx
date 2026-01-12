import { devnet, mainnet } from "@starknet-start/chains";
import { jsonRpcProvider } from "@starknet-start/providers";
import { QueryClient } from "@tanstack/react-query";
import {
  type RenderHookOptions,
  type RenderOptions,
  type RenderResult,
  render,
  renderHook,
} from "@testing-library/react";
import type React from "react";
import type { MockWalletOptions } from "../src/connectors/mock";
import { StarknetConfig as OgStarknetConfig } from "../src/context";
import { defaultConnector } from "./devnet";

function rpc() {
  return {
    nodeUrl: devnet.rpcUrls.public.http[0],
  };
}

function StarknetConfig({
  children,
  connectorOptions,
}: {
  children: React.ReactNode;
  connectorOptions?: Partial<MockWalletOptions>;
}) {
  const chains = [devnet, mainnet];
  const provider = jsonRpcProvider({ rpc });

  if (connectorOptions) {
    defaultConnector.updateOptions(connectorOptions);
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <OgStarknetConfig
      chains={chains}
      provider={provider}
      extraWallets={[defaultConnector]}
      queryClient={queryClient}
    >
      {children}
    </OgStarknetConfig>
  );
}

function customRender(
  ui: React.ReactElement,
  options: Omit<RenderOptions, "wrapper"> & {
    connectorOptions?: Partial<MockWalletOptions>;
  } = {},
): RenderResult {
  const { connectorOptions, ...renderOptions } = options;
  return render(ui, {
    wrapper: ({ children }) => (
      <StarknetConfig connectorOptions={connectorOptions}>
        {children}
      </StarknetConfig>
    ),
    ...renderOptions,
  });
}

function customRenderHook<RenderResult, Props>(
  render: (initialProps: Props) => RenderResult,
  options: Omit<RenderHookOptions<Props>, "wrapper"> & {
    connectorOptions?: Partial<MockWalletOptions>;
  } = {},
) {
  const { connectorOptions, hydrate, ...renderOptions } = options;
  return renderHook(render, {
    wrapper: ({ children }) => (
      <StarknetConfig connectorOptions={connectorOptions}>
        {children}
      </StarknetConfig>
    ),
    hydrate: hydrate as false | undefined,
    ...renderOptions,
  });
}

export * from "@testing-library/react";
export { customRender as render, customRenderHook as renderHook };
