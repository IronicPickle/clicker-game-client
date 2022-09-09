<script lang="ts">
  import type { ClassName, Style } from "@ts/generic";
  import { styles } from "@utils/generic";

  export let width: string | number = 32;
  export let height: string | number = 32;
  export let viewBox: string = "0 0 580 580";
  export let style: Style = undefined;
  export let className: ClassName = undefined;
</script>

<svg
  {width}
  {height}
  {viewBox}
  style={styles(style)}
  class={className}
  fill="currentColor"
  stroke="currentColor"
  xmlns="http://www.w3.org/2000/svg"
>
  <slot />
</svg>
