<script lang="ts">
  import colors from "@constants/colors";
  import { randomNum } from "@shared/utils/generic";
  import type { Color } from "@ts/generic";

  import { styles } from "@utils/generic";

  export let sparkWidth = "1px";
  export let sparkHeight = "10px";
  export let sparkColor: Color = "brimstone";
  export let sparks = 10;
  export let duration = 500;

  let key = Math.random();

  let interval: any;
  $: {
    clearInterval(interval);
    interval = setInterval(() => {
      key = Math.random();
    }, duration);
  }
</script>

<div
  class="sparks"
  style={styles({
    "--spark-width": sparkWidth,
    "--spark-height": sparkHeight,
    "--spark-color": `${colors[sparkColor]}`,
  })}
>
  {#key key}
    {#each new Array(sparks) as _}
      <div
        class="spark"
        style={styles({
          "--spark-rotate": `${randomNum(0, 380)}deg`,
          "--spark-delay": `${randomNum(0, duration)}ms`,
        })}
      />
    {/each}
  {/key}
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
        animation: spark 500ms infinite linear;
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
