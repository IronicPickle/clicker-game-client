<script lang="ts">
  import { styles } from "@utils/generic";
  import FormErrs from "../form/FormErrs.svelte";
  import Progress from "./Progress.svelte";

  type $$Slots = {
    default: { style?: string };
  };

  export let isLoading = false;
  export let loadingText: string | undefined = undefined;
  export let error: string | undefined = undefined;
  export let isEmpty = false;

  export let emptyMessage = "No data";

  export let hideOnly = false;
</script>

{#if isLoading}
  {#if hideOnly}
    <slot style={styles({ visibility: "hidden" })} />
  {/if}
  <div class="data-check">
    <Progress />
    {#if loadingText}
      <p class="loading-text">{loadingText}</p>
    {/if}
  </div>
{:else if error}
  {#if hideOnly}
    <slot style={styles({ visibility: "hidden" })} />
  {/if}
  <div class="data-check">
    <FormErrs errs={[error]} />
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;

    inset: 0;

    .loading-text {
      @include stardosStencil(500);
      color: $lemonDrop;
      font-size: 16px;
    }
  }
</style>
