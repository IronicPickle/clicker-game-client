<script lang="ts">
  import { getGlobalContext } from "@components/context/global/GlobalContext.svelte";

  import { round } from "@utils/generic";

  const { tweenedRpm } = getGlobalContext();
</script>

<p class="rpm">{round($tweenedRpm, 1).toFixed(1)} RPM</p>

<style lang="scss">
  .rpm {
    align-self: flex-start;

    margin: -2px 0 0 36px;

    font-size: 18px;
    color: $brimstone;
  }
</style>
