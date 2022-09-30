<script lang="ts">
  export let isLoading = false;
  export let errs: any[] | undefined = undefined;
  export let isEmpty = false;

  export let emptyMessage = "No data";
</script>

{#if isLoading}
  <div class="data-check">
    <p>Loading...</p>
  </div>
{:else if errs?.some(err => err && err.failed)}
  <div class="data-check">
    <p>{errs?.find(err => err && err.generic)}</p>
  </div>
{:else if isEmpty}
  <div class="data-check">
    <p>{emptyMessage}</p>
  </div>
{:else}
  <slot />
{/if}
