<script lang="ts" context="module">
  export type Screen = "start" | "game";

  export interface GlobalContext {
    screen: Writable<Screen>;
    rpm: Writable<number>;
  }

  const screen = writable<Screen>("start");
  const rpm = writable<number>(1);

  export const defaultGlobalContext: GlobalContext = {
    screen,
    rpm,
  };

  export const getGlobalContext = () => getContext<GlobalContext>("global") ?? defaultGlobalContext;
</script>

<script lang="ts">
  import { Writable, writable } from "svelte/store";

  import { getContext, onMount, setContext } from "svelte";

  setContext("global", defaultGlobalContext);
</script>

<slot />
