<script lang="ts">
  import { getGlobalContext } from "@components/context/GlobalContext.svelte";

  import Section from "@components/screens/game/sections/Section.svelte";
  import { diminishNumber } from "@utils/generic";
  import { tweened } from "svelte/motion";
  import RpmGear from "./RpmGear.svelte";

  const { rpm, isAccelerating } = getGlobalContext();

  let smoothRpm = tweened($rpm, {
    duration: 1000,
  });

  $: $smoothRpm = $rpm;

  let interval;
  $: {
    clearInterval(interval);
    interval = setInterval(() => {
      rpm.update(rpm => {
        let newRpm = rpm - 0.5;
        if (newRpm < 1) newRpm = 1;
        return newRpm;
      });
    }, 1000);
  }

  let timeout;
  $: {
    $rpm;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      $isAccelerating = false;
    }, 500);
  }
</script>

<Section className="earn">
  <h2 class="title">Click the Gear</h2>
  <p class="rpm">{(Math.floor($smoothRpm * 10) / 10).toFixed(1)} RPM</p>
  <RpmGear
    rpm={$rpm}
    isAccelerating={$isAccelerating}
    onClick={() => {
      const rpmIncrease = 2; // acceleration
      const scaleFactor = 0.95; // diminshing returns
      const diminishedIncrease = diminishNumber($rpm, scaleFactor, rpmIncrease);
      const newRpm = $rpm + diminishedIncrease;

      $rpm = newRpm;
      $isAccelerating = true;
    }}
  />
</Section>

<style lang="scss">
  :global(.earn) {
    position: relative;
    grid-area: earn;

    overflow: hidden;

    .title {
      margin-top: 18px;

      font-family: Rye;
      font-size: 32px;
      color: $brimstone;
      text-align: center;
    }

    .rpm {
      margin-top: 8px;

      font-size: 18px;
      color: $brimstone;
      text-align: center;
    }
  }
</style>
