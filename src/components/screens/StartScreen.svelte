<script>
  import Button from "@components/common/Button.svelte";
  import IoIosCog from "svelte-icons/io/IoIosCog.svelte";
</script>

<div class="start-screen">
  <div class="shadow-wrapper">
    <div class="wrapper">
      <h1 class="title">Clicker Punk</h1>
      <Button on:click>Start Game</Button>

      <IoIosCog />

      <IoIosCog />
    </div>
  </div>
</div>

<style lang="scss">
  .start-screen {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;

    background-color: $blackout;

    .shadow-wrapper {
      border-radius: 30px;
      box-shadow: 0 0 20px $black;

      .wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;

        padding: 20px 40px 50px 40px;

        background-color: $sandalwood;

        border-color: $lemonDrop;
        border-style: ridge;
        border-width: 15px;

        box-shadow: 0 0 0 15px darken($sandalwood, 0.3);

        border-radius: 30px;

        overflow: hidden;

        .title {
          color: $white;
          font-size: 128px;

          @include rye(400);

          z-index: 100;
        }

        :global(.button) {
          font-size: 64px;

          z-index: 100;
        }

        :global(svg) {
          position: absolute;
          bottom: 0;

          @include size(512px);

          color: $lemonDrop;

          &:first-of-type {
            left: 0;

            transform: translate(-55%, 45%);
          }

          &:last-of-type {
            right: 0;

            transform: translate(55%, 45%);
          }
        }
      }
    }
  }
</style>
