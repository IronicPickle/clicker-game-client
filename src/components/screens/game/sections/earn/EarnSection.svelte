<script lang="ts">
  import Audio from "@components/common/generic/Audio.svelte";
  import Lamp from "@components/common/generic/Lamp.svelte";
  import { getGlobalContext } from "@components/context/GlobalContext.svelte";

  import Section from "@components/screens/game/sections/Section.svelte";
  import { diminishNumber, minMax } from "@utils/generic";
  import { tweened } from "svelte/motion";
  import RpmGear from "./RpmGear.svelte";

  import IoIosBulb from "svelte-icons/io/IoIosBulb.svelte";
  import IoIosSpeedometer from "svelte-icons/io/IoIosSpeedometer.svelte";
  import LampButton from "@components/common/generic/LampButton.svelte";
  import GoStop from "svelte-icons/go/GoStop.svelte";

  const { rpm, isAccelerating, tweenedRpm, isRunning } = getGlobalContext();

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
  <p class="rpm">{(Math.floor($tweenedRpm * 10) / 10).toFixed(1)} RPM</p>
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

  <div class="controls-wrapper left">
    <LampButton
      lampColor="hotLips"
      on={!$isRunning}
      disabled={!$isRunning}
      on:click={() => {
        $rpm = 0;
      }}
    >
      <GoStop />
    </LampButton>
    <Lamp on={$isRunning} lampColor="fatalFields">
      <IoIosBulb />
    </Lamp>
  </div>
  <div class="controls-wrapper right">
    <Lamp on={$isAccelerating} lampColor="hotLips">
      <IoIosSpeedometer />
    </Lamp>
  </div>

  <Audio src="/audio/gears_running.mp3" playing={$isRunning} loop volume={0.5} />
  <Audio src="/audio/gears_stopping.mp3" playing={!$isRunning} volume={0.5} />
</Section>

<style lang="scss">
  :global(.earn) {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    grid-area: earn;

    min-height: 300px;

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

    .controls-wrapper {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;

      bottom: 0;
      margin: 16px 20px;

      &.left {
        left: 0;
      }

      &.right {
        right: 0;
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
