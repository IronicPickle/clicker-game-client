<script lang="ts">
  import { classNames, minMax, randomNum, round, styles } from "@utils/generic";
  import Sparks from "@components/common/effects/Sparks.svelte";
  import type { ClassName, Style } from "@ts/generic";
  import pSBC from "@utils/pSBC";
  import colors from "@constants/colors";
  import type { SvelteComponent } from "svelte";
  import { Howl, Howler } from "howler";

  export let rpm = 0;
  export let ratio = 1;
  export let rotationDirection: "clockwise" | "counter-clockwise" = "clockwise";
  export let onClick: () => void = undefined;
  export let isAccelerating = false;
  export let grindingSparksSide: "top" | "right" | "bottom" | "left" = undefined;

  export let GearIcon: typeof SvelteComponent;

  export let style: Style = undefined;
  export let className: ClassName = undefined;

  const oneMinute = 1000 * 60;
  const sparksDuration = 300;

  let interval;
  let i = 0;
  let rotation = i;
  let duration = 0;
  let effectiveRpm = 0;
  let degreesPerUpdate = 0.5;

  $: effectiveRpm = round(rpm * ratio, 2);
  $: degreesPerUpdate = minMax(Math.floor((effectiveRpm / 10) * ratio), 0.5, 9);
  $: duration = minMax(round(oneMinute / effectiveRpm / (360 / degreesPerUpdate), 2), 5);

  $: {
    clearInterval(interval);

    if (effectiveRpm > 0) {
      interval = setInterval(() => {
        if (i + degreesPerUpdate >= 360) i = 0;
        else i += degreesPerUpdate;
        rotation = i;
      }, duration);
    }
  }

  let sparkCoords: Array<{ x: number; y: number }> = [];
  let gearWrapper: HTMLDivElement;

  const metalTap = new Howl({
    src: ["/audio/metal_tap.mp3"],
    volume: 0.05,
  });

  const handleClick = (event: MouseEvent) => {
    onClick();

    metalTap.play();

    const { left, top } = gearWrapper.getBoundingClientRect();

    sparkCoords = [
      ...sparkCoords,
      {
        x: event.pageX - left,
        y: event.pageY - top,
      },
    ];

    setTimeout(() => {
      sparkCoords = sparkCoords.slice(1);
    }, sparksDuration);
  };
</script>

<div
  class={classNames("gear-wrapper", className)}
  bind:this={gearWrapper}
  style={styles({
    "--gear-color": pSBC(minMax(effectiveRpm, 0, 100) / 100, colors.brimstone, colors.uproarRed),
    ...style,
  })}
>
  <button
    class={classNames("click-wrapper", onClick && "clickable")}
    on:click={onClick ? handleClick : undefined}
  >
    <div
      class="spin-wrapper"
      style={styles({
        "--rotation": `${rotationDirection === "clockwise" ? "" : "-"}${rotation}deg`,
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
  </button>

  {#each sparkCoords as { x, y }}
    <div
      class="sparks-wrapper"
      style={styles({
        "--x": `${x}px`,
        "--y": `${y}px`,
      })}
    >
      <Sparks
        sparkColor="brimstone"
        sparkWidth={1}
        sparkHeight={30 * ratio}
        sparks={randomNum(5, 10)}
        duration={sparksDuration}
      />
    </div>
  {/each}
</div>

<style lang="scss">
  .gear-wrapper {
    $gear-color: var(--gear-color);

    touch-action: manipulation;

    & * {
      touch-action: manipulation;
    }

    .click-wrapper {
      width: 100%;
      height: 100%;

      background-color: transparent;
      border: none;

      &.clickable {
        transition: transform 300ms ease;
        user-select: none;
        cursor: pointer;

        &:hover {
          transform: scale(1.1);
        }
      }

      .spin-wrapper {
        $rotation: var(--rotation);

        position: relative;

        width: 100%;
        height: 100%;

        transform: rotate($rotation);
        pointer-events: none;
        z-index: 10;

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

    .sparks-wrapper {
      $x: var(--x);
      $y: var(--y);

      position: absolute;

      left: $x;
      top: $y;

      pointer-events: none;
      z-index: 100;
    }
  }
</style>
