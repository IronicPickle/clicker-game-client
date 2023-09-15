<script lang="ts">
  import { getGlobalContext } from "@components/context/global/GlobalContext.svelte";
  import { coins } from "@constants/generic";
  import { moneyToCoins } from "@utils/generic";
  import { onMount } from "svelte";
  import type { CoinDataExtended } from "./CoinIcon.svelte";
  import CoinIcon from "./CoinIcon.svelte";
  import useDynamicArray from "@hooks/useDynamicArray";
  import { randomNum } from "@shared/utils/generic";
  import type { Coin } from "@ts/generic";

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
        const coinCount = coinCounts[type as Coin];
        // for (let i = 0; i < coinCount; i++) {
        if (coinCount > 0) {
          newCoins.push({
            ...coins[type as Coin],
            key: crypto.randomUUID(),
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
        <CoinIcon {coinData} />
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
