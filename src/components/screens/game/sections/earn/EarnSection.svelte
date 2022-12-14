<script lang="ts">
  import Audio from "@components/common/generic/Audio.svelte";
  import Lamp from "@components/common/generic/Lamp.svelte";
  import { getGlobalContext } from "@components/context/global/GlobalContext.svelte";

  import Section from "@components/screens/game/sections/Section.svelte";
  import RpmGear from "../../../../common/generic/RpmGear.svelte";

  import GiLightBulb from "svelte-icons/gi/GiLightBulb.svelte";
  import GiLightningTrio from "svelte-icons/gi/GiLightningTrio.svelte";

  import CircleButton from "@components/common/generic/CircleButton.svelte";
  import GoStop from "svelte-icons/go/GoStop.svelte";
  import RpmCounter from "./RpmCounter.svelte";
  import { diminishNumber } from "@utils/algorithms";
  import CoinRain from "./CoinRain.svelte";

  const { rpm, isAccelerating, isRunning, GearIcon } = getGlobalContext();
</script>

<Section className="earn">
  <RpmGear
    rpm={$rpm}
    ratio={0.75}
    isAccelerating={$isAccelerating}
    className="top-right"
    grindingSparksSide="bottom"
    rotationDirection="counter-clockwise"
    GearIcon={$GearIcon}
  />

  <h2 class="title">Click the Gear</h2>
  <RpmCounter />
  <CoinRain />

  <RpmGear
    rpm={$rpm}
    isAccelerating={$isAccelerating}
    on:click={() => {
      const rpmIncrease = 2; // acceleration
      const scaleFactor = 0.95; // diminshing returns
      const diminishedIncrease = diminishNumber($rpm, scaleFactor, rpmIncrease);
      const newRpm = $rpm + diminishedIncrease;

      $rpm = newRpm;
    }}
    clickable
    className="main"
    grindingSparksSide="right"
    GearIcon={$GearIcon}
  />

  <div class="controls-wrapper left">
    <CircleButton
      lampColor="hotLips"
      on={!$isRunning}
      disabled={!$isRunning}
      on:click={() => {
        $rpm = 0;
      }}
    >
      <GoStop />
    </CircleButton>
    <Lamp on={$isRunning} lampColor="fatalFields">
      <GiLightBulb />
    </Lamp>
  </div>
  <div class="controls-wrapper right">
    <Lamp on={$isAccelerating} lampColor="brimstone">
      <GiLightningTrio />
    </Lamp>
  </div>

  <Audio src="/audio/gears_running.wav" preload playing={$isRunning} loop volume={0.5} />
  <Audio src="/audio/gears_stopping.mp3" html5 playing={!$isRunning} volume={0.5} />
</Section>

<style lang="scss">
  :global(.earn) {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    grid-area: earn;

    min-height: 300px;
    min-width: 500px;

    overflow: hidden;
    touch-action: manipulation;

    .title {
      align-self: flex-start;

      margin: 18px 0 0 24px;

      font-family: Rye;
      font-size: 32px;
      color: $white;

      z-index: 100;
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

    :global(.gear-wrapper) {
      position: absolute;

      width: auto;
      aspect-ratio: 1;
    }

    :global(.gear-wrapper.main) {
      height: 100%;

      top: 50%;
      margin: 0 auto;
    }

    :global(.gear-wrapper.top-right) {
      height: 75%;

      right: 0;
      top: 0;

      transform: translate(50%, -50%);
    }
  }
</style>
