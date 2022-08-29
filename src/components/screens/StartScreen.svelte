<script>
  import Button from "@components/common/Button.svelte";
  import colors from "@constants/colors";
  import { styles } from "@utils/generic";
</script>

<div class="start-screen">
  <div
    class="wrapper"
    style={styles({ "--bg-color": colors.sandalwood, "--border-color": colors.lemonDrop })}
  >
    <h1
      class="title"
      style={styles({
        "--color": colors.white,
      })}
    >
      Clicker Punk
    </h1>
    <Button>Start Game</Button>
  </div>
</div>

<style lang="scss">
  .start-screen {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;

    .wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;

      padding: 20px 40px 50px 40px;

      background-color: var(--bg-color);

      border-color: var(--border-color);
      border-style: ridge;
      border-width: 15px;

      box-shadow: 0 0 0 15px var(--bg-color);

      border-radius: 30px;

      .title {
        font-family: Rye;
        color: var(--color);
        font-size: 128px;
      }

      :global(.button) {
        font-size: 64px;
      }
    }
  }
</style>
