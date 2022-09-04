<script lang="ts" context="module">
  export type Screen = "start" | "game";

  export interface GlobalContext {
    screen: Writable<Screen>;
    rpm: Writable<number>;
    isAccelerating: Writable<boolean>;
  }

  const screen = writable<Screen>("start");
  const rpm = writable(0);
  const isAccelerating = writable(false);

  export const defaultGlobalContext: GlobalContext = {
    screen,
    rpm,
    isAccelerating,
  };

  export const getGlobalContext = () => getContext<GlobalContext>("global") ?? defaultGlobalContext;
</script>

<script lang="ts">
  import { Writable, writable } from "svelte/store";

  import { getContext, setContext } from "svelte";

  setContext("global", defaultGlobalContext);
</script>

<slot />
