<script>
  import StartScreen from "./screens/StartScreen.svelte";

  let screen = "start";
</script>

<main>
  {#if screen === "start"}
    <StartScreen
      on:click={() => {
        screen = "game";
      }}
    />
  {/if}
</main>

<style lang="scss">
  main {
    background-color: $blackout;
  }
</style>
