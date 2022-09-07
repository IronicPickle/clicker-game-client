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

  const rpmReductionInterval = 1000;
  const rpmReductionRate = 0.5;

  $: $isRunning = $rpm > 0;
  $: $GearIcon = _GearIcon;
  $: tweenedRpm.set($rpm, { duration: rpmReductionInterval });

  let interval;
  $: {
    clearInterval(interval);
    interval = setInterval(() => {
      rpm.update(rpm => {
        let newRpm = rpm - rpmReductionRate;
        if (newRpm < 0) newRpm = 0;
        return newRpm;
      });
    }, rpmReductionInterval);
  }

  let timeout;
  $: {
    $rpm;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      $isAccelerating = false;
    }, rpmReductionInterval);
  }

  setContext("global", defaultGlobalContext);
</script>

<slot />
