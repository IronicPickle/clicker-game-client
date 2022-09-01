<script lang="ts">
  import colors from "@constants/colors";
  import type { Color } from "@ts/generic";

  import { styles } from "@utils/generic";

  export let sparkWidth = 1;
  export let sparkHeight = 10;
  export let sparkColor: Color = "brimstone";
</script>

<div
  class="sparks"
  style={styles({
    "--spark-width": `${sparkWidth}px`,
    "--spark-height": `${sparkHeight}px`,
    "--spark-color": `${colors[sparkColor]}`,
  })}
>
  <div class="spark" style="--spark-rotate: 10deg; --spark-delay: 223ms" />
  <div class="spark" style="--spark-rotate: 20deg; --spark-delay: 844ms" />
  <div class="spark" style="--spark-rotate: 30deg; --spark-delay: 130ms" />
  <div class="spark" style="--spark-rotate: 40deg; --spark-delay: 747ms" />
  <div class="spark" style="--spark-rotate: 50deg; --spark-delay: 928ms" />
  <div class="spark" style="--spark-rotate: 60deg; --spark-delay: 392ms" />
  <div class="spark" style="--spark-rotate: 70deg; --spark-delay: 483ms" />
  <div class="spark" style="--spark-rotate: 80deg; --spark-delay: 621ms" />
  <div class="spark" style="--spark-rotate: 90deg; --spark-delay: 814ms" />
  <div class="spark" style="--spark-rotate: 100deg; --spark-delay: 802ms" />
  <div class="spark" style="--spark-rotate: 110deg; --spark-delay: 837ms" />
  <div class="spark" style="--spark-rotate: 120deg; --spark-delay: 238ms" />
  <div class="spark" style="--spark-rotate: 130deg; --spark-delay: 642ms" />
  <div class="spark" style="--spark-rotate: 140deg; --spark-delay: 58ms" />
  <div class="spark" style="--spark-rotate: 150deg; --spark-delay: 404ms" />
  <div class="spark" style="--spark-rotate: 160deg; --spark-delay: 576ms" />
  <div class="spark" style="--spark-rotate: 170deg; --spark-delay: 944ms" />
  <div class="spark" style="--spark-rotate: 180deg; --spark-delay: 635ms" />
  <div class="spark" style="--spark-rotate: 190deg; --spark-delay: 205ms" />
  <div class="spark" style="--spark-rotate: 200deg; --spark-delay: 91ms" />
  <div class="spark" style="--spark-rotate: 210deg; --spark-delay: 829ms" />
  <div class="spark" style="--spark-rotate: 220deg; --spark-delay: 969ms" />
  <div class="spark" style="--spark-rotate: 230deg; --spark-delay: 861ms" />
  <div class="spark" style="--spark-rotate: 240deg; --spark-delay: 201ms" />
  <div class="spark" style="--spark-rotate: 250deg; --spark-delay: 173ms" />
  <div class="spark" style="--spark-rotate: 260deg; --spark-delay: 967ms" />
  <div class="spark" style="--spark-rotate: 270deg; --spark-delay: 548ms" />
  <div class="spark" style="--spark-rotate: 280deg; --spark-delay: 392ms" />
  <div class="spark" style="--spark-rotate: 290deg; --spark-delay: 273ms" />
  <div class="spark" style="--spark-rotate: 300deg; --spark-delay: 6ms" />
  <div class="spark" style="--spark-rotate: 310deg; --spark-delay: 1ms" />
  <div class="spark" style="--spark-rotate: 320deg; --spark-delay: 854ms" />
  <div class="spark" style="--spark-rotate: 330deg; --spark-delay: 159ms" />
  <div class="spark" style="--spark-rotate: 340deg; --spark-delay: 60ms" />
  <div class="spark" style="--spark-rotate: 350deg; --spark-delay: 986ms" />
  <div class="spark" style="--spark-rotate: 360deg; --spark-delay: 559ms" />
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
