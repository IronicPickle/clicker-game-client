<script lang="ts">
  import type { Color } from "@ts/generic";
  import { styles } from "@utils/generic";
  import type { SvelteComponent } from "svelte";
  import Sparks from "../effects/Sparks.svelte";
  import GearIcon1 from "../media/gears/GearIcon1.svelte";

  export let size: string = "64px";
  export let color: Color = "white";

  export let GearIcon: typeof SvelteComponent = GearIcon1;
</script>

<div class="progress" style={styles({ "--size": size, "--color": color })}>
  <svelte:component this={GearIcon} />
  <svelte:component this={GearIcon} />

  <Sparks sparkWidth={`calc(${size} / 75)`} sparkHeight={`calc(${size} / 5)`} sparks={10} />
</div>

<style lang="scss">
  .progress {
    $size: var(--size);
    $color: var(--color);

    position: relative;

    width: $size;
    height: $size;
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
    }

    :global(svg:last-of-type) {
      bottom: 0;
      right: 0;

      animation-direction: reverse;
      animation-delay: calc($delay / -30.7692308);
    }

    :global(.sparks) {
      top: 50%;
      left: 50%;
    }
  }
</style>
