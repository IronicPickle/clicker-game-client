<script lang="ts">
  import { fade } from "svelte/transition";
  import colors from "@constants/colors";
  import type { Color } from "@ts/generic";

  import { randomNum, styles } from "@utils/generic";

  export let sparkWidth = 1;
  export let sparkHeight = 10;
  export let sparkColor: Color = "brimstone";

  const delays = [
    223, 844, 130, 747, 928, 392, 483, 621, 814, 802, 837, 238, 642, 58, 404, 576, 944, 635, 205,
    91, 829, 969, 861, 201, 173, 967, 548, 392, 273, 6, 1, 854, 159, 60, 986, 559,
  ];
</script>

<div
  class="sparks"
  style={styles({
    "--spark-width": `${sparkWidth}px`,
    "--spark-height": `${sparkHeight}px`,
    "--spark-color": `${colors[sparkColor]}`,
  })}
>
  {#each delays as delay}
    <div
      class="spark"
      style={styles({
        "--spark-rotate": `${randomNum(0, 380)}deg`,
        "--spark-delay": `${delay}ms`,
      })}
      out:fade={{ duration: 300 }}
    />
  {/each}
</div>

<style lang="scss">
  .sparks {
    $sparkWidth: var(--spark-width);
    $sparkHeight: var(--spark-height);
    $sparkColor: var(--spark-color);

    position: absolute;
    .spark {
      $sparkRotate: var(--spark-rotate);
      $sparkDelay: var(--spark-delay);

      position: absolute;
      width: $sparkWidth;
      height: $sparkWidth;
      transform: rotate($sparkRotate);

      &::after {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;

        width: $sparkWidth;
        height: $sparkHeight;
        border-radius: 0.1rem;
        opacity: 0;
        background-color: $sparkColor;
        transform-origin: bottom center;
        animation: spark 0.5s infinite linear;
        animation-delay: $sparkDelay;
      }
    }
  }

  @keyframes spark {
    0% {
      transform: translateY(-0.5rem) scaleY(0.25);
      opacity: 0;
    }
    10% {
      transform: translateY(-1rem) scaleY(0.5);
      opacity: 0.35;
    }
    30% {
      transform: translateY(-2rem) scaleY(0.5);
      opacity: 0.7;
    }
    50% {
      transform: translateY(-4rem) scaleY(1.5);
      opacity: 0.7;
    }
    51% {
      opacity: 0;
      transform: translateY(-4rem) scaleY(1);
    }
    100% {
      opacity: 0;
      transform: translateY(0) scaleY(0.25);
    }
  }
</style>
