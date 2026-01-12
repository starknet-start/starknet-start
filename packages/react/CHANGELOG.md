# Change Log - @starknet-react/core

<!-- This log was last generated on Fri, 19 Sep 2025 09:41:34 GMT and should not be manually modified. -->

<!-- Start content -->

## 5.0.3

Fri, 19 Sep 2025 09:41:34 GMT

### Patches

- core: fix wallet.connect and wrong acc on network switch while connect (jadejajaipal5@gmail.com)

## 5.0.2

Mon, 08 Sep 2025 15:33:35 GMT

### Patches

- core: fix connector `connect()` bug when network is different in wallet (jadejajaipal5@gmail.com)

## 5.0.1

Mon, 25 Aug 2025 20:12:46 GMT

### Patches

- core: remove non-working RPC (francesco@ceccon.me)
- BREAKING: upgrade starknet.js from 7.6.4 to 8.1.2

This upgrade includes breaking changes from starknet.js v8:
- Internal RPC channel updated from 0.8.1 to 0.9.0
- Contract class now uses _Contract instead of Contract
- Response parser uses resourceBoundsOverhead instead of margin
- Added new deployer and defaultTipType properties to Account
- Block identifier defaults changed from 'pending' to 'latest' (valentin@pupucecorp.com)

## 4.0.4

Mon, 11 Aug 2025 12:21:21 GMT

### Patches

- fix: paymaster api key header (lenny@419labs.io)

## 4.0.3

Mon, 28 Jul 2025 18:23:13 GMT

### Patches

- chore: format and linting with updated biome (jadejajaipal5@gmail.com)

## 4.0.2

Sun, 27 Jul 2025 13:11:19 GMT

### Patches

- fix release (francesco@ceccon.me)

## 5.0.0

Sun, 27 Jul 2025 12:54:18 GMT

### Major changes

- chore: bump `starknet.js` to v7.6.4 (jadejajaipal5@gmail.com)

## 4.0.1-beta.4

Wed, 25 Jun 2025 09:50:16 GMT

### Changes

- core: rename Argent to Ready (francesco@ceccon.me)

## 4.0.1-beta.3

Mon, 09 Jun 2025 12:34:01 GMT

### Minor changes

- Implement paymaster hooks (lenny@419labs.io)

## 4.0.1-beta.1

Thu, 08 May 2025 10:03:17 GMT

### Changes

- core: remove nethermind rpc provider (francesco@ceccon.me)

## 4.0.1-beta.0

Tue, 06 May 2025 07:09:23 GMT

### Major changes

- core: upgrade starknet.js to v7 (jadejajaipal5@gmail.com)

## 3.7.4

Sun, 27 Apr 2025 08:33:24 GMT

### Patches

- core: useAccount address on initial render (dave.vodrazka@gmail.com)

## 3.7.3

Fri, 25 Apr 2025 13:38:49 GMT

### Patches

- Add cartridge explorer (jun.sugiura.jp@gmail.com)

## 3.7.2

Fri, 24 Jan 2025 12:30:17 GMT

### Patches

- fix: re exports packages (princanurag07@gmail.com)

## 3.7.1

Mon, 13 Jan 2025 12:22:40 GMT

### Patches

- core: fail if there is duplicated chain ids (craftedbyte97@gmail.com)

## 3.7.0

Sun, 12 Jan 2025 16:37:15 GMT

### Minor changes

- Implement useEvents hook (craftedbyte97@gmail.com)

## 3.6.5

Sat, 11 Jan 2025 11:15:27 GMT

### Patches

- feat: useCall convert bigint in args to string (dave.vodrazka@gmail.com)

## 3.6.4

Thu, 09 Jan 2025 09:48:12 GMT

### Patches

- core: add useUniversalDeployerContract hook (jadejajaipal5@gmail.com)

## 3.6.3

Sat, 14 Dec 2024 16:19:53 GMT

### Patches

- core: update abi-wan-kanabi (francesco@ceccon.me)

## 3.6.2

Fri, 29 Nov 2024 12:34:32 GMT

### Patches

- fix: useStarkProfile support ipfs image urls (iris.devillars@gmail.com)

## 3.6.1

Fri, 29 Nov 2024 10:00:02 GMT

### Patches

- fix: useStarkProfile hook (iris.devillars@gmail.com)

## 3.6.0

Tue, 12 Nov 2024 10:43:28 GMT

### Minor changes

- core: add legacy connector adapter (francesco@ceccon.me)

## 3.5.0

Thu, 31 Oct 2024 12:36:27 GMT

### Minor changes

- add details about controller, add new providers for cartridge and slot, improve docs around controller (ponderingdemocritus@protonmail.com)

## 3.4.1

Wed, 30 Oct 2024 14:00:10 GMT

### Patches

- core: add disconnect event listener for wallets (jadejajaipal5@gmail.com)

## 3.4.0

Tue, 29 Oct 2024 16:28:38 GMT

### Minor changes

- add chainId hint in connector's `connect` (mathieu@kakarot.org)

### Patches

- Add provider option to select default chain when no wallet is connected (francesco@ceccon.me)
- Sync packages version (francesco@ceccon.me)
- core: reduce the number of wallet api calls (francesco@ceccon.me)

## 2.9.0

### Minor Changes

- [#471](https://github.com/apibara/starknet-react/pull/471) [`574a6fa`](https://github.com/apibara/starknet-react/commit/574a6faf5ae9e872a0090496d6d5929bc988e86b) Thanks [@avimak](https://github.com/avimak)! - use mobile-connector when dApp is launched within an in-app mobile browser

## 2.8.3

### Patch Changes

- [#456](https://github.com/apibara/starknet-react/pull/456) [`fcd6ffe`](https://github.com/apibara/starknet-react/commit/fcd6ffed8c8a14e565396fa0af4377eaabd985aa) Thanks [@fracek](https://github.com/fracek)! - Fix disabling queries

## 2.8.2

### Patch Changes

- [#446](https://github.com/apibara/starknet-react/pull/446) [`c2335bb`](https://github.com/apibara/starknet-react/commit/c2335bb148f2d729a44246949fedd2159583fdf5) Thanks [@irisdv](https://github.com/irisdv)! - Update StarknetId sepolia contracts

## 2.8.1

### Patch Changes

- [#437](https://github.com/apibara/starknet-react/pull/437) [`1ab99de`](https://github.com/apibara/starknet-react/commit/1ab99de7b07d75af26e0804f0a2a26903eac1c9f) Thanks [@ugur-eren](https://github.com/ugur-eren)! - Move the default query client to outside of the Provider component

## 2.8.0

### Minor Changes

- [#431](https://github.com/apibara/starknet-react/pull/431) [`89cbfe0`](https://github.com/apibara/starknet-react/commit/89cbfe0c71f8d6fd6ce75090cddb173c1d7b9f27) Thanks [@irisdv](https://github.com/irisdv)! - Fix starknetID hooks to work with latest version of StarknetID contracts

## 2.7.0

### Minor Changes

- [#427](https://github.com/apibara/starknet-react/pull/427) [`03715dc`](https://github.com/apibara/starknet-react/commit/03715dc75deff5be0511aad18463a1ff29745532) Thanks [@irisdv](https://github.com/irisdv)! - fix: useStarkProfile to work with base64 tokenURI

### Patch Changes

- [#436](https://github.com/apibara/starknet-react/pull/436) [`0c272b8`](https://github.com/apibara/starknet-react/commit/0c272b8ea0a9f65d117d87e19a8d2e86dfe9cc7f) Thanks [@fracek](https://github.com/fracek)! - useStarkProfile to work with base64 tokenURI

- [#436](https://github.com/apibara/starknet-react/pull/436) [`0c272b8`](https://github.com/apibara/starknet-react/commit/0c272b8ea0a9f65d117d87e19a8d2e86dfe9cc7f) Thanks [@fracek](https://github.com/fracek)! - useStarkProfile to work with IPFS token URI

## 2.6.1

### Patch Changes

- [#429](https://github.com/apibara/starknet-react/pull/429) [`d6e3b95`](https://github.com/apibara/starknet-react/commit/d6e3b95eca2a348cf7acca9d3486d9b0813ab2c1) Thanks [@fracek](https://github.com/fracek)! - Add option to useBalance to override block identifier

## 2.6.0

### Minor Changes

- [#422](https://github.com/apibara/starknet-react/pull/422) [`78b124d`](https://github.com/apibara/starknet-react/commit/78b124deb4a21a23908b52c38a9dd60d86a1dd22) Thanks [@ugur-eren](https://github.com/ugur-eren)! - Add useEstimateFees hook to estimate smart contract calls fees

## 2.5.0

### Minor Changes

- [#415](https://github.com/apibara/starknet-react/pull/415) [`458b75a`](https://github.com/apibara/starknet-react/commit/458b75a8618498dfb7a2dabaebc792b63f51082a) Thanks [@irisdv](https://github.com/irisdv)! - Update starknetid Sepolia contract addresses

## 2.4.0

### Minor Changes

- [#410](https://github.com/apibara/starknet-react/pull/410) [`61eda85`](https://github.com/apibara/starknet-react/commit/61eda85fdfb2f1ca7eb3eb32bfa718b28578afba) Thanks [@irisdv](https://github.com/irisdv)! - update starknetid hooks to work with latest version of starknetid contracts

### Patch Changes

- [#408](https://github.com/apibara/starknet-react/pull/408) [`2df5559`](https://github.com/apibara/starknet-react/commit/2df5559dd5636366eb1fac19215aef1d4ae93823) Thanks [@notV4l](https://github.com/notV4l)! - add formatUnits from viem in useBalance

## 2.3.0

### Minor Changes

- [#403](https://github.com/apibara/starknet-react/pull/403) [`1384143`](https://github.com/apibara/starknet-react/commit/138414312e3805369363932d11c558c1f2136440) Thanks [@irisdv](https://github.com/irisdv)! - fix starknetid hooks & add sepolia support to starknetid hooks

## 2.2.5

### Patch Changes

- Updated dependencies [[`b82f6398db8244a812914ecb5e25c196e8a1b8b7`](https://github.com/apibara/starknet-react/commit/b82f6398db8244a812914ecb5e25c196e8a1b8b7)]:
  - @starknet-react/chains@0.1.7

## 2.2.4

### Patch Changes

- Updated dependencies [[`ff3f7b64dd9f362cf704b4c17eed140b4d63760d`](https://github.com/apibara/starknet-react/commit/ff3f7b64dd9f362cf704b4c17eed140b4d63760d)]:
  - @starknet-react/chains@0.1.6

## 2.2.3

### Patch Changes

- [#392](https://github.com/apibara/starknet-react/pull/392) [`1aeb04e93a8da5729707f17524623d7acd699c9d`](https://github.com/apibara/starknet-react/commit/1aeb04e93a8da5729707f17524623d7acd699c9d) Thanks [@fracek](https://github.com/fracek)! - Fix package.json types/main order

## 2.2.2

### Patch Changes

- [#390](https://github.com/apibara/starknet-react/pull/390) [`3f7bf39b7ab4ff3fd5e1190f56de46aad1bea72e`](https://github.com/apibara/starknet-react/commit/3f7bf39b7ab4ff3fd5e1190f56de46aad1bea72e) Thanks [@fracek](https://github.com/fracek)! - Refresh pending contract call

## 2.2.1

### Patch Changes

- Updated dependencies [[`9750b16062c4646608b6e7d46fd64f709c324eb3`](https://github.com/apibara/starknet-react/commit/9750b16062c4646608b6e7d46fd64f709c324eb3)]:
  - @starknet-react/chains@0.1.5

## 2.2.0

### Minor Changes

- [#383](https://github.com/apibara/starknet-react/pull/383) [`28bb07c314f592c2b768006b367371485115bd82`](https://github.com/apibara/starknet-react/commit/28bb07c314f592c2b768006b367371485115bd82) Thanks [@fracek](https://github.com/fracek)! - Add support for Sepolia testnet

## 2.1.6

### Patch Changes

- [#385](https://github.com/apibara/starknet-react/pull/385) [`e8bb1c6445bd23322dd2cdc5738771c510906dcc`](https://github.com/apibara/starknet-react/commit/e8bb1c6445bd23322dd2cdc5738771c510906dcc) Thanks [@fracek](https://github.com/fracek)! - Add Reddio RPC

- Updated dependencies [[`e8bb1c6445bd23322dd2cdc5738771c510906dcc`](https://github.com/apibara/starknet-react/commit/e8bb1c6445bd23322dd2cdc5738771c510906dcc)]:
  - @starknet-react/chains@0.1.4

## 2.1.5

### Patch Changes

- [#377](https://github.com/apibara/starknet-react/pull/377) [`0720c81e5aabdda1df8e42b2235fe4e76510e158`](https://github.com/apibara/starknet-react/commit/0720c81e5aabdda1df8e42b2235fe4e76510e158) Thanks [@mgavillo](https://github.com/mgavillo)! - Embed wallet icons

## 2.1.4

### Patch Changes

- [#375](https://github.com/apibara/starknet-react/pull/375) [`c8f20af5fa6a2f4ac0dd25f4c167ea611d18615e`](https://github.com/apibara/starknet-react/commit/c8f20af5fa6a2f4ac0dd25f4c167ea611d18615e) Thanks [@fracek](https://github.com/fracek)! - Randomly select between multiple public rpc providers

- Updated dependencies [[`c8f20af5fa6a2f4ac0dd25f4c167ea611d18615e`](https://github.com/apibara/starknet-react/commit/c8f20af5fa6a2f4ac0dd25f4c167ea611d18615e)]:
  - @starknet-react/chains@0.1.3

## 2.1.3

### Patch Changes

- Updated dependencies [[`201df5d1da0335c087da334e9ed4ca332ed95b34`](https://github.com/apibara/starknet-react/commit/201df5d1da0335c087da334e9ed4ca332ed95b34)]:
  - @starknet-react/chains@0.1.2

## 2.1.2

### Patch Changes

- [#366](https://github.com/apibara/starknet-react/pull/366) [`ff47734b298f7cb684804b2af89833774cc87199`](https://github.com/apibara/starknet-react/commit/ff47734b298f7cb684804b2af89833774cc87199) Thanks [@TeddyNotBear](https://github.com/TeddyNotBear)! - update providers docs

- [#371](https://github.com/apibara/starknet-react/pull/371) [`db6236843b1e5dda7f1c8443eefd7812714dfc31`](https://github.com/apibara/starknet-react/commit/db6236843b1e5dda7f1c8443eefd7812714dfc31) Thanks [@fracek](https://github.com/fracek)! - Add useExplorer hook

- [#371](https://github.com/apibara/starknet-react/pull/371) [`e74287b226d17a7ffa648b4ff5cdfd6e31af3072`](https://github.com/apibara/starknet-react/commit/e74287b226d17a7ffa648b4ff5cdfd6e31af3072) Thanks [@fracek](https://github.com/fracek)! - Add support for Blast and Nethermind RPC

- Updated dependencies [[`ff47734b298f7cb684804b2af89833774cc87199`](https://github.com/apibara/starknet-react/commit/ff47734b298f7cb684804b2af89833774cc87199), [`e74287b226d17a7ffa648b4ff5cdfd6e31af3072`](https://github.com/apibara/starknet-react/commit/e74287b226d17a7ffa648b4ff5cdfd6e31af3072)]:
  - @starknet-react/chains@0.1.1

## 2.1.1

### Patch Changes

- [#362](https://github.com/apibara/starknet-react/pull/362) [`b492205`](https://github.com/apibara/starknet-react/commit/b4922051770f1bde6b9258677b4751db169c73b8) Thanks [@TeddyNotBear](https://github.com/TeddyNotBear)! - Fix lava provider typo

## 2.1.0

### Minor Changes

- [#361](https://github.com/apibara/starknet-react/pull/361) [`df223d0`](https://github.com/apibara/starknet-react/commit/df223d0769ff753f8df81e632fd487c6846b31cc) Thanks [@fracek](https://github.com/fracek)! - Return connector's chainId from useAccount hook

- [#354](https://github.com/apibara/starknet-react/pull/354) [`89e0e8b`](https://github.com/apibara/starknet-react/commit/89e0e8bd30c9c7d8691678d376214e111e365f54) Thanks [@irisdv](https://github.com/irisdv)! - Add useStarkProfile hook

## 2.0.0

### Major Changes

- [#299](https://github.com/apibara/starknet-react/pull/299) [`226e4cb`](https://github.com/apibara/starknet-react/commit/226e4cb1d8e9b478dc57d45a98a59a57733572bb) Thanks [@fracek](https://github.com/fracek)! - Split provider and account

### Patch Changes

- [#322](https://github.com/apibara/starknet-react/pull/322) [`244fedf`](https://github.com/apibara/starknet-react/commit/244fedf1a99c82bb7b58cb1de15d3b712c35d2d1) Thanks [@fracek](https://github.com/fracek)! - Remove Buffer usage

- [#327](https://github.com/apibara/starknet-react/pull/327) [`d33a723`](https://github.com/apibara/starknet-react/commit/d33a723a2ab3b79f020ebd4b65316712f0191b98) Thanks [@fracek](https://github.com/fracek)! - Change provider configuration

- [#302](https://github.com/apibara/starknet-react/pull/302) [`792a27a`](https://github.com/apibara/starknet-react/commit/792a27a8db625e7a3650d318d99a38337f4ea072) Thanks [@fracek](https://github.com/fracek)! - Add useDeployAccount hook

- [#308](https://github.com/apibara/starknet-react/pull/308) [`ca15368`](https://github.com/apibara/starknet-react/commit/ca15368cfaeb62c99d9b8e1d268030f38553bcc8) Thanks [@fracek](https://github.com/fracek)! - Improve network and account change detection

- [#314](https://github.com/apibara/starknet-react/pull/314) [`bc0816b`](https://github.com/apibara/starknet-react/commit/bc0816bb3a0aa28c8117fc1cf8b4dd8ec5ee9fa2) Thanks [@fracek](https://github.com/fracek)! - Fix wallet connection when wallet not authorized

- [#336](https://github.com/apibara/starknet-react/pull/336) [`8b3ad82`](https://github.com/apibara/starknet-react/commit/8b3ad825c100262aedc47d7da2cb465f9c6ddb44) Thanks [@fracek](https://github.com/fracek)! - Update tanstack query to v5

- [#314](https://github.com/apibara/starknet-react/pull/314) [`bc0816b`](https://github.com/apibara/starknet-react/commit/bc0816bb3a0aa28c8117fc1cf8b4dd8ec5ee9fa2) Thanks [@fracek](https://github.com/fracek)! - Add hook to detect injected connectors

- [#311](https://github.com/apibara/starknet-react/pull/311) [`6560a2d`](https://github.com/apibara/starknet-react/commit/6560a2d92f93150faef4df360c39b595765ccafd) Thanks [@fracek](https://github.com/fracek)! - Improve network and account change detection

- Updated dependencies [[`226e4cb`](https://github.com/apibara/starknet-react/commit/226e4cb1d8e9b478dc57d45a98a59a57733572bb), [`035575f`](https://github.com/apibara/starknet-react/commit/035575fe3a998f38fd2532d61847aeaabad82d9f)]:
  - @starknet-react/chains@0.1.0

## 2.0.0-next.7

### Patch Changes

- [#336](https://github.com/apibara/starknet-react/pull/336) [`8b3ad82`](https://github.com/apibara/starknet-react/commit/8b3ad825c100262aedc47d7da2cb465f9c6ddb44) Thanks [@fracek](https://github.com/fracek)! - Update tanstack query to v5

## 2.0.0-next.6

### Patch Changes

- [#327](https://github.com/apibara/starknet-react/pull/327) [`d33a723`](https://github.com/apibara/starknet-react/commit/d33a723a2ab3b79f020ebd4b65316712f0191b98) Thanks [@fracek](https://github.com/fracek)! - Change provider configuration

## 2.0.0-next.5

### Patch Changes

- [#322](https://github.com/apibara/starknet-react/pull/322) [`244fedf`](https://github.com/apibara/starknet-react/commit/244fedf1a99c82bb7b58cb1de15d3b712c35d2d1) Thanks [@fracek](https://github.com/fracek)! - Remove Buffer usage

## 2.0.0-next.4

### Patch Changes

- Updated dependencies [[`035575f`](https://github.com/apibara/starknet-react/commit/035575fe3a998f38fd2532d61847aeaabad82d9f)]:
  - @starknet-react/chains@0.1.0-next.1

## 2.0.0-next.3

### Patch Changes

- [#314](https://github.com/apibara/starknet-react/pull/314) [`bc0816b`](https://github.com/apibara/starknet-react/commit/bc0816bb3a0aa28c8117fc1cf8b4dd8ec5ee9fa2) Thanks [@fracek](https://github.com/fracek)! - Fix wallet connection when wallet not authorized

- [#314](https://github.com/apibara/starknet-react/pull/314) [`bc0816b`](https://github.com/apibara/starknet-react/commit/bc0816bb3a0aa28c8117fc1cf8b4dd8ec5ee9fa2) Thanks [@fracek](https://github.com/fracek)! - Add hook to detect injected connectors

## 2.0.0-next.2

### Patch Changes

- [#311](https://github.com/apibara/starknet-react/pull/311) [`6560a2d`](https://github.com/apibara/starknet-react/commit/6560a2d92f93150faef4df360c39b595765ccafd) Thanks [@fracek](https://github.com/fracek)! - Improve network and account change detection

## 2.0.0-next.1

### Patch Changes

- [#302](https://github.com/apibara/starknet-react/pull/302) [`792a27a`](https://github.com/apibara/starknet-react/commit/792a27a8db625e7a3650d318d99a38337f4ea072) Thanks [@fracek](https://github.com/fracek)! - Add useDeployAccount hook

- [#308](https://github.com/apibara/starknet-react/pull/308) [`ca15368`](https://github.com/apibara/starknet-react/commit/ca15368cfaeb62c99d9b8e1d268030f38553bcc8) Thanks [@fracek](https://github.com/fracek)! - Improve network and account change detection

## 2.0.0-next.0

### Major Changes

- [#299](https://github.com/apibara/starknet-react/pull/299) [`226e4cb`](https://github.com/apibara/starknet-react/commit/226e4cb1d8e9b478dc57d45a98a59a57733572bb) Thanks [@fracek](https://github.com/fracek)! - Split provider and account

### Patch Changes

- Updated dependencies [[`226e4cb`](https://github.com/apibara/starknet-react/commit/226e4cb1d8e9b478dc57d45a98a59a57733572bb)]:
  - @starknet-react/chains@0.1.0-next.0

## 1.0.4

### Patch Changes

- [#294](https://github.com/apibara/starknet-react/pull/294) [`5836c47`](https://github.com/apibara/starknet-react/commit/5836c475406aa76b6041419ac3a76d7231fd87cb) Thanks [@fracek](https://github.com/fracek)! - Throw exception if a contract method doesn't exist

## 1.0.3

### Patch Changes

- [#286](https://github.com/apibara/starknet-react/pull/286) [`79a191e`](https://github.com/apibara/starknet-react/commit/79a191ed583214ad87fa211d509fd98357b47d19) Thanks [@fracek](https://github.com/fracek)! - Remove starknet and get-starknet-core from dependencies

- [#284](https://github.com/apibara/starknet-react/pull/284) [`eaad1f0`](https://github.com/apibara/starknet-react/commit/eaad1f00b0d907aad7db32a4fa940fc31511531a) Thanks [@fracek](https://github.com/fracek)! - Fix useNetwork hook

## 1.0.2

### Patch Changes

- [#281](https://github.com/apibara/starknet-react/pull/281) [`072cc64`](https://github.com/apibara/starknet-react/commit/072cc64a0f76b731d376e4475b87deb5e4baea80) Thanks [@fracek](https://github.com/fracek)! - Add `onConnect` and `onDisconnect` callbacks to `useAccount`

## 1.0.1

### Patch Changes

- [#270](https://github.com/apibara/starknet-react/pull/270) [`0f637eb`](https://github.com/apibara/starknet-react/commit/0f637eb1c58bc8c3f410e0096340bf36927bbb32) Thanks [@fracek](https://github.com/fracek)! - Fix get-starknet-core dependency version

## 1.0.0

### Major Changes

- [#268](https://github.com/apibara/starknet-react/pull/268) [`0161696`](https://github.com/apibara/starknet-react/commit/01616966f5a12040481a2a950122ce9ec978f69a) Thanks [@fracek](https://github.com/fracek)! - Upgrade to starknet.js v5.

  Breaking changes:

  - The `id`, `name`, and `icon` methods in the `Connector` base class are now
    properties.
  - All Starknet.js types are now from v5. Follow [Starknet.js migration
    guide](https://www.starknetjs.com/docs/guides/migrate) to update your
    application.

  This release also removes several deprecated functions:

  - `useStarknetBlock`, use `useBlock`.
  - `useStarknetInvoke`, use `useContractWrite` with a single call.
  - `useStarknet`. To access the currently connected account, using
    `useAccount`. For the current `ProviderInterface`, use the new `useProvider`
    hook. For `connect`, `disconnect`, and `connectors` use `useConnectors`.

## 0.18.0

### Minor Changes

- [#263](https://github.com/apibara/starknet-react/pull/263) [`dfda7eb`](https://github.com/apibara/starknet-react/commit/dfda7eb1163d1eba250180a401fd85645ed2b251) Thanks [@fracek](https://github.com/fracek)! - Request AccountInterface v4 to injected wallets

## 0.17.6

### Patch Changes

- [#258](https://github.com/apibara/starknet-react/pull/258) [`ac063f9`](https://github.com/apibara/starknet-react/commit/ac063f9f85136e25a8aabca08b0ef1c0ccdd6944) Thanks [@fracek](https://github.com/fracek)! - Remove react-query devtools

- [#258](https://github.com/apibara/starknet-react/pull/258) [`ac063f9`](https://github.com/apibara/starknet-react/commit/ac063f9f85136e25a8aabca08b0ef1c0ccdd6944) Thanks [@fracek](https://github.com/fracek)! - Update dependencies

## 0.17.5

### Patch Changes

- [#256](https://github.com/apibara/starknet-react/pull/256) [`d0cf301`](https://github.com/apibara/starknet-react/commit/d0cf3013a90643c92725a6a77207235795b0e144) Thanks [@fracek](https://github.com/fracek)! - Add option to display react-query devtools

## 0.17.4

### Patch Changes

- [#254](https://github.com/apibara/starknet-react/pull/254) [`d60cec9`](https://github.com/apibara/starknet-react/commit/d60cec97f01466137564af5708c79af6d60b99f2) Thanks [@fracek](https://github.com/fracek)! - Invalidate transaction queries on new block

## 0.17.3

### Patch Changes

- [`92d0a58`](https://github.com/apibara/starknet-react/commit/92d0a58462d68c6353c2531abc145a42e15c951d) Thanks [@fracek](https://github.com/fracek)! - Add connector icon support

## 0.17.2

### Patch Changes

- [#241](https://github.com/apibara/starknet-react/pull/241) [`edaa363`](https://github.com/apibara/starknet-react/commit/edaa363e353fa9490c5bdf039212c3fec1a82ee3) Thanks [@davelange](https://github.com/davelange)! - add useBalance hook

## 0.17.1

### Patch Changes

- [#220](https://github.com/apibara/starknet-react/pull/220) [`ddccd53`](https://github.com/apibara/starknet-react/commit/ddccd535288810acacda28d6524c3c08292fe3e8) Thanks [@irisdv](https://github.com/irisdv)! - Update starknet.js version & starknet.id hooks

## 0.17.0

### Minor Changes

- [#234](https://github.com/apibara/starknet-react/pull/234) [`a2880a2`](https://github.com/apibara/starknet-react/commit/a2880a2f857f84d1c959303f89bc6aedcb6eb7f2) Thanks [@florian-bellotti](https://github.com/florian-bellotti)! - fix change account

* [#229](https://github.com/apibara/starknet-react/pull/229) [`ad3a8d6`](https://github.com/apibara/starknet-react/commit/ad3a8d6109b654fb6a9e09c9edf4ea749c13b967) Thanks [@0xads](https://github.com/0xads)! - useConnectors return isLoading

## 0.16.0

### Minor Changes

- [#228](https://github.com/apibara/starknet-react/pull/228) [`af3793c`](https://github.com/apibara/starknet-react/commit/af3793ccf7d1a358ada5ce24950ecf628edf34bc) Thanks [@florian-bellotti](https://github.com/florian-bellotti)! - Fix injected connector

* [`3549c63`](https://github.com/apibara/starknet-react/commit/3549c63ec6688efec77804a77a2f40ade09c1570) Thanks [@irisdv](https://github.com/irisdv)! - Update starknet-react hooks to match wagmi api

## 0.15.1

### Patch Changes

- [#218](https://github.com/apibara/starknet-react/pull/218) [`df22f16`](https://github.com/apibara/starknet-react/commit/df22f16bf935d88238e5f99d5ed11bfd0a22dd09) Thanks [@fracek](https://github.com/fracek)! - Export starknet.id hook

## 0.15.0

### Minor Changes

- [`94413da`](https://github.com/apibara/starknet-react/commit/94413da0878efb92efb8ce47f58a3112ad8e471f) Thanks [@fracek](https://github.com/fracek)! - Use get-starknet connectors

### Patch Changes

- [`94413da`](https://github.com/apibara/starknet-react/commit/94413da0878efb92efb8ce47f58a3112ad8e471f) Thanks [@fracek](https://github.com/fracek)! - Add starknet.id hooks

## 0.14.8

### Patch Changes

- [#196](https://github.com/apibara/starknet-react/pull/196) [`e34a9cb`](https://github.com/apibara/starknet-react/commit/e34a9cb86442a63fa689185052d4fe68cbca7d66) Thanks [@fracek](https://github.com/fracek)! - Update starknet.js version

## 0.14.7

### Patch Changes

- [`59c81d0`](https://github.com/apibara/starknet-react/commit/59c81d09461d2fc13be8ad824e368ef95fc6ef99) Thanks [@fracek](https://github.com/fracek)! - Add goerli2 testnet support

## 0.14.6

### Patch Changes

- [#191](https://github.com/apibara/starknet-react/pull/191) [`96e90d5`](https://github.com/apibara/starknet-react/commit/96e90d5bbcf1c7e3e65f94142a8019f80dc2eada) Thanks [@fracek](https://github.com/fracek)! - Include src folder in package

## 0.14.5

### Patch Changes

- [`23bbc6f`](https://github.com/apibara/starknet-react/commit/23bbc6fd5ad7bda335c8ff84ac952941c2431320) Thanks [@fracek](https://github.com/fracek)! - Auto connect now remembers last connected wallet

## 0.14.4

### Patch Changes

- [#184](https://github.com/apibara/starknet-react/pull/184) [`ef468f3`](https://github.com/apibara/starknet-react/commit/ef468f3e8458cb595ce6cfd7608dccef259158a4) Thanks [@fracek](https://github.com/fracek)! - Transaction receipt hook now refreshes data

## 0.14.3

### Patch Changes

- [#182](https://github.com/apibara/starknet-react/pull/182) [`f822de6`](https://github.com/apibara/starknet-react/commit/f822de66b4c889ff3148becabd68888c04d8d838) Thanks [@fracek](https://github.com/fracek)! - Refresh receipt data on every block

## 0.14.2

### Patch Changes

- [#180](https://github.com/apibara/starknet-react/pull/180) [`a791114`](https://github.com/apibara/starknet-react/commit/a79111483b87511a583d8e0013c39aa1a84aa8dc) Thanks [@fracek](https://github.com/fracek)! - Add useTransactionReceipt hook

## 0.14.1

### Patch Changes

- [`60aeefb`](https://github.com/apibara/starknet-react/commit/60aeefb125e68fabeb196026b5e5aeaac11fdb5b) Thanks [@nmalzieu](https://github.com/nmalzieu)! - Use react-query refetch for refreshing calls

## 0.14.0

### Minor Changes

- [#171](https://github.com/apibara/starknet-react/pull/171) [`edb036f`](https://github.com/apibara/starknet-react/commit/edb036f20be430018df59c62439a0b409811f833) Thanks [@fracek](https://github.com/fracek)! - Refactor to use react-query

* [#171](https://github.com/apibara/starknet-react/pull/171) [`24d041d`](https://github.com/apibara/starknet-react/commit/24d041d5fea1fc2dc7a856f162585e42fc89e2c5) Thanks [@fracek](https://github.com/fracek)! - Add useNetwork hook.

### Patch Changes

- [#171](https://github.com/apibara/starknet-react/pull/171) [`9d81e3e`](https://github.com/apibara/starknet-react/commit/9d81e3e9e3a0f37d8d8ddda210b47ed9b2575244) Thanks [@fracek](https://github.com/fracek)! - Add useDeploy hook.

## 0.13.4

### Patch Changes

- [#159](https://github.com/apibara/starknet-react/pull/159) [`fdc2ce2`](https://github.com/apibara/starknet-react/commit/fdc2ce21139bc139728c48518230c2916c09d560) Thanks [@fracek](https://github.com/fracek)! - Change connector api to reflect that account may be null

## 0.13.3

### Patch Changes

- [#154](https://github.com/apibara/starknet-react/pull/154) [`0ca8dc9`](https://github.com/apibara/starknet-react/commit/0ca8dc9e7230013d3d987e16bafba12193b46a4d) Thanks [@nmalzieu](https://github.com/nmalzieu)! - Add the ability to pass blockNumber to contract call method

* [#157](https://github.com/apibara/starknet-react/pull/157) [`faad89b`](https://github.com/apibara/starknet-react/commit/faad89b375cd55e9a94213e88e223f4f565dc4b0) Thanks [@fracek](https://github.com/fracek)! - Fix multicall execute when connectors missing

## 0.13.2

### Patch Changes

- [#151](https://github.com/apibara/starknet-react/pull/151) [`dbc561d`](https://github.com/apibara/starknet-react/commit/dbc561decbd6e31cbe80c6922718bf4de1099797) Thanks [@fracek](https://github.com/fracek)! - Refresh execute call data

## 0.13.1

### Patch Changes

- [#147](https://github.com/apibara/starknet-react/pull/147) [`227b48a`](https://github.com/apibara/starknet-react/commit/227b48a1f821cef24a9b06be6d8305df9bc02010) Thanks [@fracek](https://github.com/fracek)! - Fix execute hook export

## 0.13.0

### Minor Changes

- [#145](https://github.com/apibara/starknet-react/pull/145) [`9fb19b2`](https://github.com/apibara/starknet-react/commit/9fb19b277723e508ed7304d69e98c9606a2c6b25) Thanks [@fracek](https://github.com/fracek)! - Added execute hook to enable multicalls

## 0.12.0

### Minor Changes

- [#137](https://github.com/apibara/starknet-react/pull/137) [`9642726`](https://github.com/apibara/starknet-react/commit/96427267594aed6462820fb3bcd1d1011a2d4bb8) Thanks [@fracek](https://github.com/fracek)! - Change injected connector to work with multiple injected wallets

* [#132](https://github.com/apibara/starknet-react/pull/132) [`f9d38cb`](https://github.com/apibara/starknet-react/commit/f9d38cb3ec59aacb04ad67f3fa64e4a2eb176a36) Thanks [@sam0110](https://github.com/sam0110)! - Added the signTypedData hook

### Patch Changes

- [#139](https://github.com/apibara/starknet-react/pull/139) [`eebac96`](https://github.com/apibara/starknet-react/commit/eebac962922db774c6db87d1a0558be298b11459) Thanks [@fracek](https://github.com/fracek)! - Change sign hook values to match other hooks

## 0.11.1

### Patch Changes

- [`3ecdc75`](https://github.com/apibara/starknet-react/commit/3ecdc75a67603eaef6530e7dd567362d653b5d39) Thanks [@fracek](https://github.com/fracek)! - Fix transaction state tracking

## 0.11.0

### Minor Changes

- [`8a9d75f`](https://github.com/apibara/starknet-react/commit/8a9d75f8d774e4439ce57c64e2154b47f4f1f144) Thanks [@fracek](https://github.com/fracek)! - Update connector interface to multi wallet

## 0.10.2

### Patch Changes

- [#120](https://github.com/apibara/starknet-react/pull/120) [`883cba7`](https://github.com/apibara/starknet-react/commit/883cba7b7188201ab27baccf75f3569a3eec4cc3) Thanks [@fracek](https://github.com/fracek)! - Add option to not refresh contract data

* [#118](https://github.com/apibara/starknet-react/pull/118) [`3ee8a11`](https://github.com/apibara/starknet-react/commit/3ee8a11ea0927c080a3f8353b504abe7c86c145d) Thanks [@fracek](https://github.com/fracek)! - Improve connector disconnect

## 0.10.1

### Patch Changes

- [#116](https://github.com/apibara/starknet-react/pull/116) [`bf8e21c`](https://github.com/apibara/starknet-react/commit/bf8e21cfdbd912e621fdcf165963bd384432bbaf) Thanks [@fracek](https://github.com/fracek)! - Add invoke overrides

## 0.10.0

### Minor Changes

- [#109](https://github.com/apibara/starknet-react/pull/109) [`c587559`](https://github.com/apibara/starknet-react/commit/c587559a2396fb679e810cb70aadd8e7ee4942eb) Thanks [@fracek](https://github.com/fracek)! - Update get-starknet dependency

## 0.9.0

### Minor Changes

- [#99](https://github.com/apibara/starknet-react/pull/99) [`41af1fb`](https://github.com/apibara/starknet-react/commit/41af1fb8ee9373789fe398c8b671d0ee0ec3c3a7) Thanks [@fracek](https://github.com/fracek)! - Add metadata to transaction

## 0.8.1

### Patch Changes

- [#88](https://github.com/apibara/starknet-react/pull/88) [`e08bcec`](https://github.com/apibara/starknet-react/commit/e08bcec309c1ce33ca99a3d3b2a7ec65f8cb8120) Thanks [@fracek](https://github.com/fracek)! - Reduce number of rerenders caused by state updates

## 0.8.0

### Minor Changes

- [#84](https://github.com/apibara/starknet-react/pull/84) [`d9a322d`](https://github.com/apibara/starknet-react/commit/d9a322d360e1213a5b02917c6a2cda56a59cbbe7) Thanks [@rootulp](https://github.com/rootulp)! - Add support for disconnect

## 0.7.2

### Patch Changes

- [#78](https://github.com/apibara/starknet-react/pull/78) [`a1a7a50`](https://github.com/apibara/starknet-react/commit/a1a7a509688d3a4e8f7eaf96892fb2fbb3f4ae89) Thanks [@tarrencev](https://github.com/tarrencev)! - ensure autoconnect executes once

## 0.7.1

### Patch Changes

- [#73](https://github.com/apibara/starknet-react/pull/73) [`05096a9`](https://github.com/apibara/starknet-react/commit/05096a9ac50262f526045bc1207dd4eaa797b877) Thanks [@fracek](https://github.com/fracek)! - Fix auto connect in production builds

## 0.7.0

### Minor Changes

- [#71](https://github.com/apibara/starknet-react/pull/71) [`ec3999a`](https://github.com/apibara/starknet-react/commit/ec3999a2f50a788485d1453aa955a5a15c582298) Thanks [@tarrencev](https://github.com/tarrencev)! - Support for autoconnect

## 0.6.3

### Patch Changes

- [#66](https://github.com/apibara/starknet-react/pull/66) [`b5bf30f`](https://github.com/apibara/starknet-react/commit/b5bf30f92ef5c6ea62aebe6e322457de9055c4ef) Thanks [@tarrencev](https://github.com/tarrencev)! - export types

## 0.6.2

### Patch Changes

- [#61](https://github.com/apibara/starknet-react/pull/61) [`f6bc3e1`](https://github.com/apibara/starknet-react/commit/f6bc3e104eef2b3ed2a6887204249ef93e1bb725) Thanks [@fracek](https://github.com/fracek)! - Add option to change default provider

* [#61](https://github.com/apibara/starknet-react/pull/61) [`deb5959`](https://github.com/apibara/starknet-react/commit/deb5959ac1b1a1814bcd157462993e683dcab0f3) Thanks [@fracek](https://github.com/fracek)! - Fix ConnectorNotFound exception when user has Argent X installed

## 0.6.1

### Patch Changes

- [#55](https://github.com/apibara/starknet-react/pull/55) [`87e41cd`](https://github.com/apibara/starknet-react/commit/87e41cd5b997052376f5dac6de00498391501a54) Thanks [@fracek](https://github.com/fracek)! - Fix @starknet-react/core peer dependencies

## 0.6.0

### Minor Changes

- [#51](https://github.com/apibara/starknet-react/pull/51) [`8171dae`](https://github.com/apibara/starknet-react/commit/8171daecb58fc642627b96772a5c99e6b240d067) Thanks [@tarrencev](https://github.com/tarrencev)! - Modularize connectors

## 0.5.0

### Minor Changes

- [#49](https://github.com/apibara/starknet-react/pull/49) [`a09a87b`](https://github.com/apibara/starknet-react/commit/a09a87b87e1afddb23a766a5990903c599b5e603) Thanks [@fracek](https://github.com/fracek)! - Upgrade starknet.js to version 3.x

## 0.4.6

### Patch Changes

- [#40](https://github.com/apibara/starknet-react/pull/40) [`47bdc79`](https://github.com/apibara/starknet-react/commit/47bdc79606dd133bdc7d4895594368bbb62aff6f) Thanks [@micksabox](https://github.com/micksabox)! - Fix invoke loading state

## 0.4.5

### Patch Changes

- [#38](https://github.com/apibara/starknet-react/pull/38) [`a4a0c91`](https://github.com/apibara/starknet-react/commit/a4a0c9108e455d1b030df712ece5618c65c85b9d) Thanks [@fracek](https://github.com/fracek)! - Fix StarkNet plugin detection

## 0.4.4

### Patch Changes

- [#27](https://github.com/apibara/starknet-react/pull/27) [`380d4fc`](https://github.com/apibara/starknet-react/commit/380d4fc7f047a0045e5c1fbe7aaaf84c9e423bbb) Thanks [@fracek](https://github.com/fracek)! - Improve reliability of starknet detection

## 0.4.3

### Patch Changes

- [#25](https://github.com/apibara/starknet-react/pull/25) [`c5ff2d6`](https://github.com/apibara/starknet-react/commit/c5ff2d60bd57a43fc1462b21d4900d5db2de0a32) Thanks [@fracek](https://github.com/fracek)! - Fix contract call hook making too many requests

## 0.4.2

### Patch Changes

- [#23](https://github.com/apibara/starknet-react/pull/23) [`f076dbf`](https://github.com/apibara/starknet-react/commit/f076dbf043ac4faae89e3d965346a8e9d824de94) Thanks [@fracek](https://github.com/fracek)! - Fix contract call refresh on arguments change

## 0.4.1

### Patch Changes

- [#19](https://github.com/apibara/starknet-react/pull/19) [`44ad99d`](https://github.com/apibara/starknet-react/commit/44ad99dbeb6dd1f07721bd3773480ad7918f9918) Thanks [@fracek](https://github.com/fracek)! - Publish documentation

## 0.4.0

### Minor Changes

- [#15](https://github.com/apibara/starknet-react/pull/15) [`18172ea`](https://github.com/apibara/starknet-react/commit/18172ea070aef7d311a84dcef289a60fb48cdd6a) Thanks [@fracek](https://github.com/fracek)! - Add transaction manager

## 0.3.0

### Minor Changes

- [#10](https://github.com/apibara/starknet-react/pull/10) [`0f30559`](https://github.com/apibara/starknet-react/commit/0f305592dab4b703d67c2541d452fee85930c416) Thanks [@fracek](https://github.com/fracek)! - Change hooks interface

* [#10](https://github.com/apibara/starknet-react/pull/10) [`eeb9269`](https://github.com/apibara/starknet-react/commit/eeb926923eda256740746d45a9b7614b51dada29) Thanks [@fracek](https://github.com/fracek)! - Add useStarknetInvoke hook

## 0.2.0

### Minor Changes

- 0eee611: Add useContract and useStarknetCall hooks

## 0.1.0

### Minor Changes

- bb0084a: useStarknet hook now returns an error on activation

### Patch Changes

- 9c814f3: Improve CI release
