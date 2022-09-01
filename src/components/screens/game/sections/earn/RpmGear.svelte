<script lang="ts">
  import { getGlobalContext } from "@components/context/GlobalContext.svelte";
  import IoIosCog from "svelte-icons/io/IoIosCog.svelte";
  import { styles } from "@utils/generic";
  import { writable } from "svelte/store";
  import { tweened } from "svelte/motion";
  import Sparks from "@components/effects/Sparks.svelte";

  const { rpm } = getGlobalContext();

  const oneMinute = 1000 * 60;
  const duration = writable(oneMinute / $rpm / 90);

  $: {
    $duration = oneMinute / $rpm / 90;
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

  const handleClick = (event: MouseEvent) => {
    rpm.update(rpm => rpm * 2);

    const target = event.target as HTMLDivElement;
    console.log(target.getBoundingClientRect());

    console.log(event.x, event.pageX, event.clientX, event.offsetX, event.screenX, event.movementX);

    sparkCoords = [
      ...sparkCoords,
      {
        x: event.offsetX,
        y: event.offsetY,
      },
    ];

    setTimeout(() => {
      sparkCoords = sparkCoords.slice(1);
    }, 250);
  };
</script>

<div class="gear-wrapper">
  <div class="click-wrapper" on:click={handleClick}>
    <div
      class="spin-wrapper"
      style={styles({
        "--rotation": `${$rotation}deg`,
      })}
    >
      <IoIosCog />
    </div>
    {#each sparkCoords as sparkCoord}
      <div
        class="sparks-wrapper"
        style={styles({
          "--x": `${sparkCoord.x}px`,
          "--y": `${sparkCoord.y}px`,
        })}
      >
        <Sparks sparkColor="brimstone" />
      </div>
    {/each}
  </div>
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

      cursor: pointer;
      user-select: none;

      transform: translateY(50%) scale(1.5);
      transition: transform 300ms ease;

      &:hover {
        transform: translateY(50%) scale(1.6);
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

      .sparks-wrapper {
        $x: var(--x);
        $y: var(--y);

        position: absolute;

        left: $x;
        top: $y;

        z-index: 100;
      }
    }
  }
</style>
