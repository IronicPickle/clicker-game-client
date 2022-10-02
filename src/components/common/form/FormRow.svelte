<script lang="ts">
  import { classNames, styles } from "@utils/generic";

  export let gap: string = "16px";

  let className: string = "";
  export { className as class };
  export let id: string = "";
  export let style: string = "";
</script>

<div class={classNames("form-row", className)} {id} style={styles({ "--gap": gap }) + style}>
  <slot />
</div>

<style lang="scss">
  .form-row {
    $gap: var(--gap);

    position: relative;
    display: flex;
    align-items: flex-start;
    gap: $gap;
  }
</style>
