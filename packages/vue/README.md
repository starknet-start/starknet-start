# starknet-vue

Vue composables and plugin to connect Starknet wallets using the same primitives as `@starknet-react/core`.

```ts
import { createApp } from "vue";
import { createStarknetVue, publicProvider, mainnet } from "starknet-vue";

const app = createApp(App);

const starknet = createStarknetVue({
  chains: [mainnet],
  provider: publicProvider(),
});

app.use(starknet);
app.mount("#app");
```
