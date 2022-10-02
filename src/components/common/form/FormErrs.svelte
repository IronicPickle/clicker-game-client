<script lang="ts">
  export let errs: string[] | undefined = undefined;
</script>

{#if errs}
  <div class="errs">
    {#each errs as err}
      <p class="err">{err}</p>
    {/each}
  </div>
{/if}

<style lang="scss">
  .errs {
    display: flex;
    flex-direction: column;
    gap: 0;

    .err {
      @include stardosStencil(500);
      color: $uproarRed;
      font-size: 14px;
      text-shadow: 2px 2px 5px $blackout;
    }
  }
</style>
