export function disconnectMutationKey({ chainId }: { chainId: string }) {
  return [{ entity: "disconnect", chainId }] as const;
}

export function disconnectMutationFn({
  disconnect,
}: {
  disconnect: () => Promise<void> | void;
}) {
  return async () => {
    return await disconnect();
  };
}
