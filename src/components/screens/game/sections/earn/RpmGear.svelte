<script lang="ts">
  import IoIosCog from "svelte-icons/io/IoIosCog.svelte";
  import { classNames, minMax, styles } from "@utils/generic";
  import { writable } from "svelte/store";
  import { tweened } from "svelte/motion";
  import Sparks from "@components/effects/Sparks.svelte";

  export let rpm = 0;
  export let onClick: () => void = undefined;
  export let isAccelerating = false;

  const oneMinute = 1000 * 60;
  const duration = writable(oneMinute / rpm / 90);

  $: {
    $duration = oneMinute / rpm / 90;
  }

  let interval;
  let i = 0;
  let rotation = tweened(i, {
    duration: $duration,
  });

  $: {
    clearInterval(interval);

    interval = setInterval(() => {
      if (i + 4 >= 360) i = 0;
      else i += 4;
      rotation.set(i, { duration: i === 0 ? 0 : $duration });
    }, $duration);
  }

  let sparkCoords: Array<{ x: number; y: number }> = [];
  let gearWrapper: HTMLDivElement;

  const handleClick = (event: MouseEvent) => {
    if (onClick) onClick();

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
    }, 200);
  };
</script>

<div class="gear-wrapper" bind:this={gearWrapper}>
  <div class={classNames("click-wrapper", onClick && "clickable")} on:click={handleClick}>
    <div
      class="spin-wrapper"
      style={styles({
        "--rotation": `${$rotation}deg`,
      })}
    >
      <IoIosCog />
    </div>

    {#if !isAccelerating && rpm > 1 && onClick}
      <div class="grinding-sparks-wrapper">
        <Sparks sparkColor="lemonDrop" sparkWidth={1} sparkHeight={minMax(rpm / 2, 5, 15)} />
      </div>
    {/if}
  </div>
  {#each sparkCoords as sparkCoord}
    <div
      class="sparks-wrapper"
      style={styles({
        "--x": `${sparkCoord.x}px`,
        "--y": `${sparkCoord.y}px`,
      })}
    >
      <Sparks sparkColor="brimstone" sparkWidth={1} sparkHeight={20} />
    </div>
  {/each}
</div>

<style lang="scss">
  .gear-wrapper {
    position: absolute;
    display: flex;
    justify-content: center;

    inset: 0;

    .click-wrapper {
      position: relative;
      display: flex;

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
        position: relative;

        $rotation: var(--rotation);

        transform: rotate($rotation);

        pointer-events: none;

        z-index: 10;

        :global(svg) {
          width: auto;
          height: 100%;

          color: $brimstone;
        }
      }

      .grinding-sparks-wrapper {
        position: absolute;

        right: 15%;
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
