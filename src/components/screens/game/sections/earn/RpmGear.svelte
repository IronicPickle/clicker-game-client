<script lang="ts">
  import { classNames, minMax, randomNum, styles } from "@utils/generic";
  import { writable } from "svelte/store";
  import { tweened } from "svelte/motion";
  import Sparks from "@components/common/effects/Sparks.svelte";
  import GearIcon1 from "@components/common/media/gears/GearIcon1.svelte";
  import type { ClassName, Style } from "@ts/generic";
  import dayjs from "dayjs";
  import Audio from "@components/common/generic/Audio.svelte";

  export let rpm = 0;
  export let ratio = 1;
  export let rotationDirection: "clockwise" | "counter-clockwise" = "clockwise";
  export let onClick: () => void = undefined;
  export let isAccelerating = false;
  export let grindingSparksSide: "top" | "right" | "bottom" | "left" = undefined;

  export let style: Style = undefined;
  export let className: ClassName = undefined;

  let effectiveRpm = 0;
  $: effectiveRpm = rpm * ratio;

  const oneMinute = 1000 * 60;
  const degreesPerUpdate = 0.5;
  const duration = writable(oneMinute / effectiveRpm / (360 / degreesPerUpdate));
  $: $duration = oneMinute / effectiveRpm / (360 / degreesPerUpdate);
  const sparksDuration = 300;

  let interval;
  let i = 0;
  let rotation = tweened(i);

  $: {
    clearInterval(interval);

    if (effectiveRpm > 0) {
      interval = setInterval(() => {
        if (i + degreesPerUpdate >= 360) i = 0;
        else i += degreesPerUpdate;
        rotation.set(i, { duration: $duration });
      }, $duration);
    }
  }

  let sparkCoords: { x: number; y: number } = undefined;
  let lastSparkDate = dayjs();
  let gearWrapper: HTMLDivElement;

  const handleClick = (event: MouseEvent) => {
    onClick();

    const diff = dayjs().diff(lastSparkDate, "milliseconds");

    if (sparkCoords || diff < randomNum(sparksDuration + 200, sparksDuration + 700)) return;
    lastSparkDate = dayjs();

    const { left, top } = gearWrapper.getBoundingClientRect();

    sparkCoords = {
      x: event.pageX - left,
      y: event.pageY - top,
    };

    setTimeout(() => {
      sparkCoords = undefined;
    }, sparksDuration);
  };
</script>

<div class={classNames("gear-wrapper", className)} bind:this={gearWrapper} style={styles(style)}>
  <div
    class={classNames("click-wrapper", onClick && "clickable")}
    on:click={onClick ? handleClick : undefined}
  >
    <div
      class="spin-wrapper"
      style={styles({
        "--rotation": `${rotationDirection === "clockwise" ? "" : "-"}${$rotation}deg`,
      })}
    >
      <GearIcon1 />
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

  {#if sparkCoords}
    <div
      class="sparks-wrapper"
      style={styles({
        "--x": `${sparkCoords.x}px`,
        "--y": `${sparkCoords.y}px`,
      })}
    >
      <Sparks
        sparkColor="brimstone"
        sparkWidth={1}
        sparkHeight={30 * ratio}
        sparks={randomNum(5, 20)}
        duration={sparksDuration}
      />
    </div>

    <Audio src="/audio/metal_tap.mp3" playing volume={0.5} />
  {/if}
</div>

<style lang="scss">
  .gear-wrapper {
    .click-wrapper {
      width: 100%;
      height: 100%;
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

          color: $brimstone;

          pointer-events: none;
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
