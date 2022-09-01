<script lang="ts">
  import { classNames } from "@utils/generic";

  export let className: string;
</script>

<section class={classNames("section", className)}><slot /></section>

<style lang="scss">
  .section {
    background-color: $blackout;

    min-width: 0;
    min-height: 0;

    margin: 10px;

    border-color: $lemonDrop;
    border-style: ridge;
    border-width: 10px;

    box-shadow: 0 0 0 10px darken($blackout, 0.3);

    border-radius: 25px;
  }
</style>
