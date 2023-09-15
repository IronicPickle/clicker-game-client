<script lang="ts">
  import Button from "@components/common/generic/Button.svelte";
  import IoIosCog from "svelte-icons/io/IoIosCog.svelte";
  import { backIn } from "svelte/easing";
  import { fly } from "svelte/transition";
  import { getGlobalContext } from "@components/context/global/GlobalContext.svelte";
  import CreateSessionForm from "./CreateSessionForm.svelte";
  import DataCheck from "@components/common/generic/DataCheck.svelte";
  import useDerivedError from "@hooks/useDerivedError";
  import useDerivedIsLoading from "@hooks/useDerivedIsLoading";
  import useIsLoadingMessage from "@hooks/useIsLoadingText";
  import { classNames } from "@utils/generic";

  const {
    session,
    sessionIsLoading,
    sessionError,
    createSessionIsLoading,
    createSessionError,
    gameDataIsLoading,
    gameDataError,
    createGameDataIsLoading,
    createGameDataError,
    gameData,
  } = getGlobalContext();

  const error = useDerivedError(
    sessionError,
    createGameDataError,
    gameDataError,
    createGameDataError,
  );
  const isLoading = useDerivedIsLoading(
    sessionIsLoading,
    createSessionIsLoading,
    gameDataIsLoading,
    createGameDataIsLoading,
  );
  const isLoadingText = useIsLoadingMessage(
    [sessionIsLoading, createSessionIsLoading, gameDataIsLoading, createGameDataIsLoading],
    ["Fetching session", "Creating session", "Fetching game data", "Creating game data"],
  );
</script>

<div class="start-screen">
  <div
    class="shadow-wrapper"
    transition:fly={{
      y: -(window.innerHeight / 2),
      easing: backIn,
      duration: 700,
    }}
  >
    <div class="wrapper">
      <h1 class="title">Clicker Punk</h1>

      <div class="inner">
        <DataCheck
          isLoading={$isLoading}
          loadingText={$isLoadingText}
          error={$error}
          hideOnly
          let:style
        >
          {#if $session && $gameData}
            <Button
              size="128px"
              baseColor="wetlandsSwamp"
              bgColor="redWineVinegar"
              rimColor="lemonDrop"
              {style}
              on:click>Start Game</Button
            >
          {:else}
            <CreateSessionForm {style} />
          {/if}
        </DataCheck>
      </div>

      <div class="cogs">
        <div class={classNames("cog-wrapper", !$session && "disabled")}>
          <IoIosCog />
        </div>
        <div class={classNames("cog-wrapper", !$gameData && "disabled")}>
          <IoIosCog />
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .start-screen {
    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;

    z-index: 100;

    .shadow-wrapper {
      border-radius: 30px;
      box-shadow: 0 0 20px $black;

      .wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        min-height: 452px;

        padding: 20px 40px 50px 40px;

        background-color: $sandalwood;

        border-color: $lemonDrop;
        border-style: ridge;
        border-width: 15px;

        box-shadow: 0 0 0 15px darken($sandalwood, 0.3);

        border-radius: 30px;

        overflow: hidden;
        box-sizing: border-box;

        .title {
          color: $white;
          font-size: 128px;

          @include rye(400);

          z-index: 100;
        }

        .inner {
          position: relative;

          :global(.form) {
            :global(.button) {
              width: 150px;
            }
          }
        }

        .cog-wrapper {
          position: absolute;
          bottom: 0;

          @include size(512px);

          color: $brimstone;

          &.disabled {
            :global(svg) {
              animation-play-state: paused;
            }
          }

          &:first-of-type {
            left: 0;

            transform: translate(-55%, 45%);

            :global(svg) {
              animation-name: spin;
              animation-duration: 2s;
              animation-timing-function: ease;
              animation-iteration-count: infinite;
            }
          }

          &:last-of-type {
            right: 0;

            transform: translate(55%, 45%);

            :global(svg) {
              animation-name: spin;
              animation-duration: 10s;
              animation-timing-function: linear;
              animation-iteration-count: infinite;
              animation-direction: reverse;
            }
          }
        }
      }
    }
  }
</style>
