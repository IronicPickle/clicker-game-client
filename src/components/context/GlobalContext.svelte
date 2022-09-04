<script lang="ts" context="module">
  export type Screen = "start" | "game";

  export interface GlobalContext {
    screen: Writable<Screen>;
    rpm: Writable<number>;
    tweenedRpm: Tweened<number>;
    isAccelerating: Writable<boolean>;
    isRunning: Writable<boolean>;
  }

  const screen = writable<Screen>("start");
  const rpm = writable(0);
  const isAccelerating = writable(false);
  const tweenedRpm = tweened(0);
  const isRunning = writable(false);

  export const defaultGlobalContext: GlobalContext = {
    screen,
    rpm,
    tweenedRpm,
    isAccelerating,
    isRunning,
  };

  export const getGlobalContext = () => getContext<GlobalContext>("global") ?? defaultGlobalContext;
</script>

<script lang="ts">
  import { Writable, writable } from "svelte/store";

  import { getContext, setContext } from "svelte";
  import { Tweened, tweened } from "svelte/motion";

  $: $isRunning = $rpm > 0;
  $: tweenedRpm.set($rpm, { duration: $isRunning ? 1000 : 0 });

  setContext("global", defaultGlobalContext);
</script>

<slot />
