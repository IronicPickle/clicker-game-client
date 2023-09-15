<script lang="ts">
  import colors from "@constants/colors";
  import type { Color } from "@ts/generic";
  import { styles } from "@utils/generic";
  import { onMount, SvelteComponent } from "svelte";
  import Sparks from "../effects/Sparks.svelte";
  import GearIcon1 from "../media/gears/GearIcon1.svelte";

  export let size: string = "64px";
  export let color: Color = "brimstone";

  export let GearIcon: typeof SvelteComponent = GearIcon1;

  let started = false;

  onMount(() => {
    setTimeout(() => {
      started = true;
    }, 10);
  });
</script>

<div class="progress" style={styles({ "--size": size, "--color": colors[color] })}>
  <svelte:component
    this={GearIcon}
    style={styles({
      left: started ? 0 : "-0.5em",
      top: started ? 0 : "-0.5em",
    })}
  />
  <svelte:component
    this={GearIcon}
    style={styles({
      right: started ? 0 : "-0.5em",
      bottom: started ? 0 : "-0.5em",
    })}
  />

  {#if started}
    <Sparks sparkWidth={`calc(${size} / 75)`} sparkHeight={`calc(${size} / 5)`} sparks={10} />
  {/if}
</div>

<style lang="scss">
  .progress {
    $size: var(--size);
    $color: var(--color);

    position: relative;

    width: $size;
    min-width: $size;
    height: $size;
    min-height: $size;
    font-size: $size;

    $delay: 2s;

    :global(svg) {
      position: absolute;

      width: 0.6em;
      height: 0.6em;

      color: $color;

      animation-name: spin;
      animation-duration: $delay;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }

    :global(svg:first-of-type) {
      top: 0;
      left: 0;

      transition: left 100ms ease, top 100ms ease;
    }

    :global(svg:last-of-type) {
      bottom: 0;
      right: 0;

      transition: right 100ms ease, bottom 100ms ease;

      animation-direction: reverse;
      animation-delay: calc($delay / -30.7692308);
    }

    :global(.sparks) {
      top: 50%;
      left: 50%;
    }
  }
</style>
