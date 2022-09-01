<script lang="ts">
  import Section from "@components/screens/game/sections/Section.svelte";
  import RpmGear from "./RpmGear.svelte";
</script>

<Section className="earn">
  <h2 class="title">Click the Gear</h2>
  <RpmGear /></Section
>

<style lang="scss">
  .title {
    margin-top: 18px;

    font-family: Rye;
    font-size: 32px;
    color: $brimstone;
    text-align: center;
  }

  :global(.earn) {
    position: relative;
    grid-area: earn;

    overflow: hidden;
  }
</style>
