<script lang="ts">
  import type { ClassName, Style } from "@ts/generic";
  import { styles } from "@utils/generic";

  let width: string | number = 32;
  let height: string | number = 32;
  let viewBox: string = "0 0 580 580";
  let style: Style;
  let className: ClassName;
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
