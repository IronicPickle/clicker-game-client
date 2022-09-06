<script lang="ts">
  import { classNames, minMax, randomNum, round, styles } from "@utils/generic";
  import Sparks from "@components/common/effects/Sparks.svelte";
  import type { ClassName, Style } from "@ts/generic";
  import dayjs from "dayjs";
  import Audio from "@components/common/generic/Audio.svelte";
  import pSBC from "@utils/pSBC";
  import colors from "@constants/colors";
  import type { SvelteComponent } from "svelte";

  export let rpm = 0;
  export let ratio = 1;
  export let rotationDirection: "clockwise" | "counter-clockwise" = "clockwise";
  export let isAccelerating = false;
  export let grindingSparksSide: "top" | "right" | "bottom" | "left" = undefined;

  export let GearIcon: typeof SvelteComponent;

  export let style: Style = undefined;
  export let className: ClassName = undefined;

  const oneMinute = 1000 * 60;

  let duration = 0;
  let effectiveRpm = 0;

  $: effectiveRpm = round(rpm * ratio, 2);
  $: duration = minMax(round(oneMinute / effectiveRpm, 2), 25);
</script>

<div
  class={classNames("gear-wrapper", className)}
  style={styles({
    "--gear-color": pSBC(minMax(effectiveRpm, 0, 100) / 100, colors.brimstone, colors.uproarRed),
    ...style,
  })}
>
  <div
    class="spin-wrapper"
    style={styles({
      "--duration": `${duration}ms`,
    })}
  >
    <GearIcon />
  </div>

  {#if !isAccelerating && effectiveRpm > 1 && grindingSparksSide}
    <div class={classNames("grinding-sparks-wrapper", grindingSparksSide)}>
      <Sparks
        sparkColor="lemonDrop"
        sparkWidth={1}
        sparkHeight={minMax(effectiveRpm / 2, 10, 30) * ratio}
        sparks={30}
        duration={minMax(effectiveRpm / 2, 20, 50) * 10 * ratio}
      />
    </div>
  {/if}
</div>

<style lang="scss">
  .gear-wrapper {
    $gear-color: var(--gear-color);

    .spin-wrapper {
      $duration: var(--duration);

      position: relative;

      width: 100%;
      height: 100%;

      pointer-events: none;
      z-index: 10;

      animation-name: spin;
      animation-duration: $duration;
      animation-timing-function: linear;
      animation-iteration-count: infinite;

      :global(svg) {
        width: 100%;
        height: 100%;

        color: $gear-color;

        pointer-events: none;
        transition: color 1000ms ease;
      }
    }

    .grinding-sparks-wrapper {
      position: absolute;

      pointer-events: none;
      z-index: 100;

      &.top {
        left: 50%;
        top: 7.5%;
      }

      &.right {
        top: 50%;
        right: 7.5%;
      }

      &.bottom {
        left: 50%;
        bottom: 7.5%;
      }

      &.left {
        top: 50%;
        left: 7.5%;
      }
    }
  }
</style>
