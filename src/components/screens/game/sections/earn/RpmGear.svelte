<script lang="ts">
  import IoIosCog from "svelte-icons/io/IoIosCog.svelte";
  import { classNames, generateUuid, minMax, randomNum, styles } from "@utils/generic";
  import { writable } from "svelte/store";
  import { tweened } from "svelte/motion";
  import Sparks from "@components/common/effects/Sparks.svelte";
  import GearIcon1 from "@components/common/media/gears/GearIcon1.svelte";

  export let rpm = 0;
  export let onClick: () => void = undefined;
  export let isAccelerating = false;

  const oneMinute = 1000 * 60;
  const degreesPerUpdate = 0.5;
  const duration = writable(oneMinute / rpm / (360 / degreesPerUpdate));
  $: $duration = oneMinute / rpm / (360 / degreesPerUpdate);
  const sparksDuration = 300;

  let interval;
  let i = 0;
  let rotation = tweened(i, {
    duration: $duration,
  });

  $: {
    clearInterval(interval);

    interval = setInterval(() => {
      if (i + degreesPerUpdate >= 360) i = 0;
      else i += degreesPerUpdate;
      rotation.set(i, { duration: i === 0 ? 0 : $duration });
    }, $duration);
  }

  let sparkCoords: Array<{ x: number; y: number; key: string }> = [];
  let gearWrapper: HTMLDivElement;

  $: console.log(sparkCoords);

  const handleClick = (event: MouseEvent) => {
    if (onClick) onClick();

    const { left, top } = gearWrapper.getBoundingClientRect();

    if (sparkCoords.length >= 1) return;

    sparkCoords = [
      ...sparkCoords,
      {
        x: event.pageX - left,
        y: event.pageY - top,
        key: generateUuid(),
      },
    ];

    setTimeout(() => {
      sparkCoords = sparkCoords.slice(1);
    }, sparksDuration);
  };
</script>

<div class="gear-wrapper" bind:this={gearWrapper} on:resize={event => console.log(event)}>
  <div class={classNames("click-wrapper", onClick && "clickable")} on:click={handleClick}>
    <div
      class="spin-wrapper"
      style={styles({
        "--rotation": `${$rotation}deg`,
      })}
    >
      <GearIcon1 />
    </div>

    {#if !isAccelerating && rpm > 1 && onClick}
      <div class="grinding-sparks-wrapper">
        <Sparks
          sparkColor="lemonDrop"
          sparkWidth={1}
          sparkHeight={minMax(rpm / 2, 10, 30)}
          sparks={30}
          duration={minMax(rpm / 2, 20, 50) * 10}
        />
      </div>
    {/if}
  </div>
  {#each sparkCoords as { x, y, key }}
    <div
      class="sparks-wrapper"
      style={styles({
        "--x": `${x}px`,
        "--y": `${y}px`,
      })}
    >
      {#key key}
        <Sparks
          sparkColor="brimstone"
          sparkWidth={1}
          sparkHeight={30}
          sparks={randomNum(10, 20)}
          duration={sparksDuration}
        />
      {/key}
    </div>
  {/each}
</div>

<style lang="scss">
  .gear-wrapper {
    position: absolute;

    inset: 0;

    .click-wrapper {
      position: relative;

      margin: 0 auto;

      height: 100%;
      width: auto;
      aspect-ratio: 1;

      &.clickable {
        transform: translateY(50%) scale(1.5);
        transition: transform 300ms ease;
        user-select: none;
        cursor: pointer;

        &:hover {
          transform: translateY(50%) scale(1.6);
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
        }
      }

      .grinding-sparks-wrapper {
        position: absolute;

        right: 20%;
        top: 50%;

        pointer-events: none;
        z-index: 100;
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
