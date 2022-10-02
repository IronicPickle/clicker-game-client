<script lang="ts">
  import { styles } from "@utils/generic";
  import FormErrs from "../form/FormErrs.svelte";
  import Progress from "./Progress.svelte";

  type $$Slots = {
    default: { style?: string };
  };

  export let isLoading = false;
  export let errs: any[] | undefined = undefined;
  export let isEmpty = false;

  export let emptyMessage = "No data";

  export let hideOnly = false;

  const genericErr = errs?.find(err => err && err.generic);
</script>

{#if isLoading}
  {#if hideOnly}
    <slot style={styles({ visibility: "hidden" })} />
  {/if}
  <div class="data-check">
    <Progress />
  </div>
{:else if genericErr}
  {#if hideOnly}
    <slot style={styles({ visibility: "hidden" })} />
  {/if}
  <div class="data-check">
    <FormErrs errs={genericErr} />
  </div>
{:else if isEmpty}
  {#if hideOnly}
    <slot style={styles({ visibility: "hidden" })} />
  {/if}
  <div class="data-check">
    <p>{emptyMessage}</p>
  </div>
{:else}
  <slot />
{/if}

<style lang="scss">
  .data-check {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    inset: 0;
  }
</style>
