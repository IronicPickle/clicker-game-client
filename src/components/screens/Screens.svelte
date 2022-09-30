<script>
  import { getGlobalContext } from "@components/context/global/GlobalContext.svelte";

  import StartScreen from "@components/screens/start/StartScreen.svelte";
  import GameScreen from "@components/screens/game/GameScreen.svelte";

  import { classNames } from "@utils/generic";

  const { screen } = getGlobalContext();
</script>

<div class={classNames("screens", `${$screen}-screen`)}>
  {#if $screen === "start"}
    <StartScreen
      on:click={() => {
        $screen = "game";
      }}
    />
  {:else if $screen === "game"}
    <GameScreen />
  {/if}
</div>

<style lang="scss">
  .screens {
    min-height: 100vh;

    transition: background-color 1s ease-in;

    &.start-screen {
      background-color: $blackout;
    }

    &.game-screen {
      background-color: $wetlandsSwamp;
    }
  }
</style>
