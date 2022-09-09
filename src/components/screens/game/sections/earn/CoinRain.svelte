<script lang="ts">
  import { getGlobalContext } from "@components/context/global/GlobalContext.svelte";
  import { coins } from "@constants/generic";
  import { generateUuid, moneyToCoins, randomNum } from "@utils/generic";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import type { CoinDataExtended } from "./Coin.svelte";
  import Coin from "./Coin.svelte";
  import useDynamicArray from "@hooks/useDynamicArray";

  const { moneyEarned } = getGlobalContext();

  const maxDuration = 750;
  const maxDelay = 50;
  const totalDuration = maxDuration + maxDelay;

  const { queue, addToQueue } = useDynamicArray<{ coins: Array<CoinDataExtended> }>(
    totalDuration,
    true,
  );

  onMount(() => {
    moneyEarned.subscribe(({ amount }) => {
      const coinCounts = moneyToCoins(amount);
      const newCoins: CoinDataExtended[] = [];

      for (const type in coinCounts) {
        const coinCount = coinCounts[type];
        // for (let i = 0; i < coinCount; i++) {
        if (coinCount > 0) {
          newCoins.push({
            ...coins[type],
            key: generateUuid(),
            duration: randomNum(maxDuration / 2, maxDuration),
            delay: randomNum(maxDelay / 2, maxDelay),
            offset: randomNum(-200, 200),
          });
        }
        // }
      }

      if (newCoins.length > 0) {
        addToQueue({ coins: newCoins });
      }
    });
  });
</script>

<div class="coin-rain">
  {#each $queue as { coins }}
    {#each coins as coinData}
      {#key coinData.key}
        <Coin {coinData} />
      {/key}
    {/each}
  {/each}
</div>

<style lang="scss">
  .coin-rain {
    position: absolute;
    display: flex;
    justify-content: center;

    inset: 0;

    pointer-events: none;
  }
</style>
