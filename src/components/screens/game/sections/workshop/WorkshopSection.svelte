<script>
  import Button from "@components/common/generic/Button.svelte";
  import CircleButton from "@components/common/generic/CircleButton.svelte";
  import RpmGear from "@components/common/generic/RpmGear.svelte";

  import { getGlobalContext } from "@components/context/global/GlobalContext.svelte";

  import Section from "@components/screens/game/sections/Section.svelte";
  import MoneyCounter from "./MoneyCounter.svelte";

  const { rpm, isAccelerating, GearIcon, session, gameData } = getGlobalContext();

  $: console.log({ $session, $gameData });

  let on = false;
</script>

<Section className="workshop">
  <h1 class="title">Workshop</h1>
  <h2 class="display-name">{$session?.displayName}</h2>

  <div class="test">
    <div class="row">
      <CircleButton size="48px" lampColor="acapulcoAqua" on:click={() => (on = !on)} {on} />
      <Button size="48px" lampColor="acapulcoAqua" on:click={() => (on = !on)} {on}>Toggle</Button>
      <CircleButton size="48px" lampColor="acapulcoAqua" on:click={() => (on = !on)} {on} />
    </div>
  </div>

  <RpmGear
    rpm={$rpm}
    ratio={2}
    isAccelerating={$isAccelerating}
    className="bottom-left"
    rotationDirection="counter-clockwise"
    GearIcon={$GearIcon}
  />

  <MoneyCounter />
</Section>

<style lang="scss">
  :global(.workshop) {
    position: relative;
    display: flex;
    flex-direction: column;

    grid-area: workshop;

    overflow: hidden;

    .title {
      font-family: Rye;
      color: $lemonDrop;
      font-size: 56px;
      text-align: center;

      margin-top: 32px;
    }

    .display-name {
      @include stardosStencil();
      color: $white;
      font-size: 32px;
      text-align: center;

      margin-top: 8px;
    }

    .test {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      gap: 32px;

      margin-top: 16px;

      .row {
        display: flex;
        align-items: center;
        gap: 32px;
      }
    }

    :global(.gear-wrapper) {
      position: absolute;

      height: auto;
      aspect-ratio: 1;
    }

    :global(.gear-wrapper.bottom-left) {
      width: 25%;

      bottom: 0;
      left: 0;

      transform: translate(-60%, 40%);
    }
  }
</style>
