<script lang="ts" context="module">
  export interface CoinDataExtended extends CoinData {
    key: string;
    duration: number;
    delay: number;
    offset: number;
  }
</script>

<script lang="ts">
  import colors from "@constants/colors";

  import type { CoinData } from "@ts/generic";
  import { styles } from "@utils/generic";

  export let coinData: CoinDataExtended;
  const { Icon, color, offset, duration, delay } = coinData;
</script>

<div
  style={styles({
    "--offset": `${offset}px`,
    "--duration": `${duration}ms`,
    "--delay": `${delay}ms`,
  })}
  class="coin-wrapper"
>
  <Icon style={styles({ "--color": colors[color] })} class="coin-icon" />
</div>

<style lang="scss">
  .coin-wrapper {
    $offset: var(--offset);
    $duration: var(--duration);
    $delay: var(--delay);

    position: absolute;

    margin-left: $offset;

    @keyframes coinDrop {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(300px);
      }
    }

    animation-name: coinDrop;
    animation-duration: $duration;
    animation-delay: $delay;
    animation-timing-function: ease-in;
    animation-play-state: running;
    animation-iteration-count: 1;
    animation-fill-mode: both;

    :global(.coin-icon) {
      $color: var(--color);

      color: $color;
      @include size(28px);
    }
  }
</style>
