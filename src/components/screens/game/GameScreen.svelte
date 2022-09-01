<script lang="ts">
  import { fade } from "svelte/transition";
  import { backIn } from "svelte/easing";

  import Sections from "@components/screens/game/sections/Sections.svelte";
</script>

<div class="game-screen">
  <div class="wrapper" transition:fade={{ duration: 700, easing: backIn }}>
    <Sections />
  </div>
</div>

<style lang="scss">
  .wrapper {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
