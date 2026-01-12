# `@starknet-react/core`

Starknet React is a collection of React hooks for Starknet.

## Installation

```
npm install @starknet-react/core
# or
yarn add @starknet-react/core
```

## Documentation

Documentation [is available online](https://apibara.github.io/starknet-react/).

## Development

Start by installing `pnpm`, then run the following command from the root of the project:

```
pnpm install
```

Running tests requires to have `starknet-devnet` running locally.
The easiest way is to use docker with:

```
docker run --rm -p 5050:5050 shardlabs/starknet-devnet:latest
```

After that, you can run tests with `pnpm test`.
