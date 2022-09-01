<script lang="ts">
  import ManageSection from "@components/screens/game/sections/manage/ManageSection.svelte";
  import WorkshopSection from "@components/screens/game/sections/workshop/WorkshopSection.svelte";
  import EarnSection from "@components/screens/game/sections/earn/EarnSection.svelte";
  import UpgradeSection from "@components/screens/game/sections/upgrade/UpgradeSection.svelte";
</script>

<div class="sections">
  <ManageSection />

  <WorkshopSection />

  <EarnSection />

  <UpgradeSection />
</div>

<style lang="scss">
  .sections {
    display: grid;
    grid-template-areas: "manage workshop upgrade" "manage workshop upgrade" "manage earn upgrade";
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;

    width: 100vw;
    height: 100vh;

    padding: 16px;

    box-sizing: border-box;
  }
</style>
