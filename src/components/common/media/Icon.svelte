<script lang="ts">
  export let width: string | number = 32;
  export let height: string | number = 32;
  export let viewBox: string = "0 0 580 580";

  let className: string = "";
  export { className as class };
  export let id: string = "";
  export let style: string = "";
</script>

<svg
  {width}
  {height}
  {viewBox}
  {style}
  {id}
  class={className}
  fill="currentColor"
  stroke="currentColor"
  xmlns="http://www.w3.org/2000/svg"
>
  <slot />
</svg>
