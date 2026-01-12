import { devnet, mainnet } from "@starknet-start/chains";
import { jsonRpcProvider } from "@starknet-start/providers";
import { describe, expect, it } from "vitest";
import { accounts, defaultConnector } from "../../test/devnet";
import { act, render, renderHook } from "../../test/react";
import {
  chainToWalletStandardChain,
  type MockWallet,
} from "../connectors/mock";
import { useStarknetAccount } from "./account";
import { StarknetProvider, useStarknet } from "./starknet";

function useStarknetWithAccount() {
  return {
    useStarknetResult: useStarknet(),
    useStarknetAccountResult: useStarknetAccount(),
  };
}

describe("StarknetProvider", () => {
  it("defaults to the first chain", async () => {
    const { result } = renderHook(() => useStarknetWithAccount());

    expect(result.current.useStarknetResult.chain.name).toEqual(
      "Starknet Devnet",
    );
    expect(
      await result.current.useStarknetResult.provider.getChainId(),
    ).toEqual(`0x${devnet.id.toString(16)}`);
  });

  it("connects to a connector", async () => {
    const { result } = renderHook(() => useStarknetWithAccount());

    expect(result.current.useStarknetResult.connected).toBeUndefined();

    await act(async () => {
      defaultConnector.switchChain(devnet.id);
      await result.current.useStarknetResult.connect(defaultConnector);
    });

    expect(result.current.useStarknetResult.connected).toBeDefined();
  });

  it("updates the account when it changes", async () => {
    const { result } = renderHook(() => useStarknetWithAccount());

    expect(result.current.useStarknetResult.connected).toBeUndefined();

    await act(async () => {
      defaultConnector.switchChain(devnet.id);
      await result.current.useStarknetResult.connect(defaultConnector);
    });

    const account = result.current.useStarknetAccountResult.account;
    expect(account?.address).toEqual(accounts.sepolia[0].address);

    await act(async () => {
      (result.current.useStarknetResult.connected as MockWallet)?.switchAccount(
        1,
      );
    });

    const account2 = result.current.useStarknetAccountResult.account;
    expect(account2?.address).toEqual(accounts.sepolia[1].address);
  });

  it("updates the chain and account when the chain changes", async () => {
    const { result } = renderHook(() => useStarknetWithAccount());

    expect(result.current.useStarknetResult.connected).toBeUndefined();

    await act(async () => {
      defaultConnector.switchChain(devnet.id);
      await result.current.useStarknetResult.connect(defaultConnector);
    });

    const account = result.current.useStarknetAccountResult.account;
    expect(account?.address).toEqual(accounts.sepolia[0].address);
    expect(result.current.useStarknetResult.connected?.chains[0]).toEqual(
      `starknet:0x${devnet.id.toString(16)}`,
    );
    expect(result.current.useStarknetResult.chain.id).toEqual(devnet.id);

    await act(async () => {
      (result.current.useStarknetResult.connected as MockWallet).switchChain(
        mainnet.id,
      );
    });

    const account2 = result.current.useStarknetAccountResult.account;
    expect(account2?.address).toEqual(accounts.mainnet[0].address);
    expect(result.current.useStarknetResult.connected?.chains[0]).toEqual(
      chainToWalletStandardChain(mainnet),
    );
  });

  it("fails if there is duplicated chain ids", async () => {
    const chains = [devnet, devnet];
    function rpc() {
      return {
        nodeUrl: devnet.rpcUrls.public.http[0],
      };
    }
    const provider = jsonRpcProvider({ rpc });

    expect(() =>
      render(
        <StarknetProvider chains={chains} provider={provider}>
          <div></div>
        </StarknetProvider>,
      ),
    ).toThrowError("Duplicated chain id found");
  });
});
