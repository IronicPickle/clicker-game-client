<script lang="ts">
  import { getGlobalContext } from "@components/context/global/GlobalContext.svelte";
  import colors from "@constants/colors";
  import useDynamicArray from "@hooks/useDynamicArray";
  import { moneyToMaxCoin, randomNum, round, styles } from "@utils/generic";
  import { raf } from "svelte/internal";

  const moneyEarnedDuration = 1000;

  const { queue, addToQueue } = useDynamicArray<{ amount: number }>(moneyEarnedDuration, true);

  const { tweenedMoney, moneyEarned, isRunning } = getGlobalContext();

  $: addToQueue($moneyEarned);
  $: if (!$isRunning) $queue = [];
</script>

<div class="money-counter">
  <p class="money">
    ${round($tweenedMoney, 2).toFixed(2)}
    {#if $isRunning}
      {#each $queue as { amount, key, available }}
        {#key key}
          {#if !available}
            <span
              class="money-earned"
              style={styles({
                "--color": colors[moneyToMaxCoin(amount)?.color],
                "--duration": `${moneyEarnedDuration}ms`,
              })}
            >
              +${round(amount, 2).toFixed(2)}
            </span>
          {/if}
        {/key}
      {/each}
    {/if}
  </p>
</div>

<style lang="scss">
  .money-counter {
    display: flex;
    justify-content: center;
    gap: 16px;

    margin: auto 0 16px 0;

    .money {
      position: relative;
      font-size: 32px;
      color: $brimstone;
      text-align: center;

      .money-earned {
        $color: var(--color);
        $duration: var(--duration);

        position: absolute;

        top: 25%;
        left: 100%;
        margin-left: 8px;

        font-size: 16px;
        color: $color;
        text-align: center;

        animation-name: dissipate;
        animation-duration: $duration;
        animation-play-state: running;
        animation-iteration-count: 1;
        animation-fill-mode: both;

        @keyframes dissipate {
          0% {
            transform: translateY(0);
            opacity: 1;
            animation-timing-function: linear;
          }
          35% {
            transform: translateY(-150%);
            opacity: 0.8;
            animation-timing-function: ease-out;
          }
          100% {
            transform: translateY(-300%);
            opacity: 0;
          }
        }
      }
    }
  }
</style>
