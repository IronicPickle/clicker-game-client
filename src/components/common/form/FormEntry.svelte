<script lang="ts">
  import colors from "@constants/colors";
  import type { Color } from "@ts/generic";
  import { classNames, styles } from "@utils/generic";
  import FormErrs from "./FormErrs.svelte";

  export let label: string | undefined = undefined;
  export let name: string | undefined = undefined;
  export let errs: string[] | undefined = undefined;
  export let gap: string = "6px";
  export let labelColor: Color = "blackout";
  export let labelSize: string = "22px";

  let className: string = "";
  export { className as class };
  export let id: string = "";
  export let style: string = "";
</script>

<div class={classNames("form-entry", className)} {id} style={styles({ "--gap": gap }) + style}>
  {#if label}
    <label
      for={name}
      style={styles({
        "--label-color": colors[labelColor],
        "--label-size": labelSize,
      })}>{label}</label
    >
  {/if}
  <slot id={name} />
  <FormErrs {errs} />
</div>

<style lang="scss">
  .form-entry {
    $gap: var(--gap);

    position: relative;
    display: flex;
    flex-direction: column;
    gap: $gap;

    label {
      $labelColor: var(--label-color);
      $labelSize: var(--label-size);

      @include stardosStencil(600);
      font-size: $labelSize;
      color: $labelColor;
    }
  }
</style>
