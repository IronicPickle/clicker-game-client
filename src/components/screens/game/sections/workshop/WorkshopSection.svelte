<script>
  import Section from "@components/screens/game/sections/Section.svelte";
</script>

<Section className="workshop">
  <h1 class="title">Workshop</h1>
</Section>

<style lang="scss">
  :global(.workshop) {
    grid-area: workshop;

    .title {
      font-family: Rye;
      color: $lemonDrop;
      font-size: 56px;
      text-align: center;

      margin-top: 32px;
    }
  }
</style>
