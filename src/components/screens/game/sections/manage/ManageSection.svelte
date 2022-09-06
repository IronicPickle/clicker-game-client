<script>
  import RpmGear from "@components/common/generic/RpmGear.svelte";

  import { getGlobalContext } from "@components/context/GlobalContext.svelte";

  import Section from "@components/screens/game/sections/Section.svelte";

  const { rpm, isAccelerating, GearIcon } = getGlobalContext();
</script>

<Section className="manage">
  <RpmGear
    rpm={$rpm}
    ratio={2}
    isAccelerating={$isAccelerating}
    className="right"
    rotationDirection="clockwise"
    GearIcon={$GearIcon}
  />
  <RpmGear
    rpm={$rpm}
    ratio={0.5}
    isAccelerating={$isAccelerating}
    className="bottom-left"
    rotationDirection="clockwise"
    GearIcon={$GearIcon}
  />
</Section>

<style lang="scss">
  :global(.manage) {
    position: relative;

    grid-area: manage;

    overflow: hidden;

    :global(.gear-wrapper) {
      position: absolute;

      height: auto;
      aspect-ratio: 1;
    }

    :global(.gear-wrapper.right) {
      width: 25%;

      top: 0;
      bottom: 0;
      right: 0;

      margin: auto 0;

      transform: translate(60%, -45%);
    }

    :global(.gear-wrapper.bottom-left) {
      width: 25%;

      bottom: 0;
      left: 0;

      transform: translate(-25%, 50%);
    }
  }
</style>
