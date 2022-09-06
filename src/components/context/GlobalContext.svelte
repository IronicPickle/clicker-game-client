<script lang="ts" context="module">
  export type Screen = "start" | "game";

  export interface GlobalContext {
    screen: Writable<Screen>;
    rpm: Writable<number>;
    tweenedRpm: Tweened<number>;
    isAccelerating: Writable<boolean>;
    isRunning: Writable<boolean>;

    GearIcon: Writable<typeof SvelteComponent>;
  }

  const screen = writable<Screen>("start");
  const rpm = writable(0);
  const tweenedRpm = tweened(0);
  const isAccelerating = writable(false);
  const isRunning = writable(false);

  const GearIcon = writable<typeof SvelteComponent>(null);

  export const defaultGlobalContext: GlobalContext = {
    screen,
    rpm,
    tweenedRpm,
    isAccelerating,
    isRunning,

    GearIcon,
  };

  export const getGlobalContext = () => getContext<GlobalContext>("global") ?? defaultGlobalContext;
</script>

<script lang="ts">
  import { Writable, writable } from "svelte/store";

  import { getContext, setContext, SvelteComponent } from "svelte";
  import { Tweened, tweened } from "svelte/motion";
  import _GearIcon from "@components/common/media/gears/GearIcon1.svelte";

  $: $isRunning = $rpm > 0;
  $: $GearIcon = _GearIcon;
  $: tweenedRpm.set($rpm, { duration: 500 });

  setContext("global", defaultGlobalContext);
</script>

<slot />
