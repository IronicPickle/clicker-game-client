<script lang="ts">
  import Audio from "@components/common/generic/Audio.svelte";
  import Button from "@components/common/generic/Button.svelte";
  import Light from "@components/common/generic/Light.svelte";
  import { getGlobalContext } from "@components/context/GlobalContext.svelte";

  import Section from "@components/screens/game/sections/Section.svelte";
  import { diminishNumber } from "@utils/generic";
  import { tweened } from "svelte/motion";
  import RpmGear from "./RpmGear.svelte";

  const { rpm, isAccelerating } = getGlobalContext();

  let running = false;
  $: running = $rpm > 0;

  let smoothRpm = tweened($rpm);

  $: smoothRpm.set($rpm, { duration: running ? 1000 : 0 });

  let interval;
  $: {
    clearInterval(interval);
    interval = setInterval(() => {
      rpm.update(rpm => {
        let newRpm = rpm - 0.5;
        if (newRpm < 0) newRpm = 0;
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
  <RpmGear
    rpm={$rpm}
    ratio={0.75}
    isAccelerating={$isAccelerating}
    className="top-right"
    grindingSparksSide="bottom"
    rotationDirection="counter-clockwise"
  />

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
    className="main"
    grindingSparksSide="right"
  />

  <div class="light-wrapper">
    <Light on={running} lightColor="hotLips" />
  </div>

  <Audio src="/audio/gears_running.mp3" playing={running} loop volume={0.5} />
  <Audio src="/audio/gears_stopping.mp3" playing={!running} volume={0.5} />
</Section>

<style lang="scss">
  :global(.earn) {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    grid-area: earn;

    min-height: 280px;

    overflow: hidden;

    .title {
      align-self: flex-start;

      margin: 18px 0 0 24px;

      font-family: Rye;
      font-size: 32px;
      color: $white;

      z-index: 100;
    }

    .rpm {
      align-self: flex-start;

      margin: -2px 0 0 36px;

      font-size: 18px;
      color: $brimstone;
    }

    :global(.light-wrapper) {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;

      left: 0;
      bottom: 0;
      margin: 16px 20px;

      .label {
        color: $lemonDrop;
        text-transform: uppercase;
        font-size: 14px;
      }
    }

    :global(.gear-wrapper.main) {
      position: absolute;

      height: 100%;
      width: auto;
      aspect-ratio: 1;

      top: 50%;
      margin: 0 auto;
    }

    :global(.gear-wrapper.top-right) {
      position: absolute;

      right: 0;
      top: 0;

      height: 75%;
      width: auto;
      aspect-ratio: 1;

      transform: translate(50%, -50%);
    }
  }
</style>
