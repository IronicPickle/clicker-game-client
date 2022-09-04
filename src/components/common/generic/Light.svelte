<script lang="ts">
  import colors from "@constants/colors";

  import type { Color } from "@ts/generic";
  import { classNames, styles } from "@utils/generic";
  import pSBC from "@utils/pSBC";

  export let on = false;
  export let baseColor: Color = "wetlandsSwamp";
  export let lightColor: Color = "hotLips";
  export let size: string = "64px";
</script>

<div
  class="light"
  style={styles({
    "--base-color": colors[baseColor],
    "--light-color-off": pSBC(-0.5, colors[lightColor]),
    "--light-color-on": colors[lightColor],
    "--size": size,
  })}
>
  <div class="base">
    <div class={classNames("lamp-outer", on ? "on" : "off")}>
      <div class="lamp-inner" />
    </div>
  </div>
</div>

<style lang="scss">
  .light {
    $base-color: var(--base-color);
    $light-color-off: var(--light-color-off);
    $light-color-on: var(--light-color-on);
    $size: var(--size);

    width: $size;
    height: $size;
    font-size: $size;

    & * {
      width: 100%;
      height: 100%;

      border-radius: 50%;

      box-sizing: border-box;
    }

    border-radius: 50%;
    box-shadow: -0.02em 0.02em 0.4em $blackout;

    .base {
      background-color: $base-color;
      box-shadow: -0.02em 0.02em 0 0.06em $base-color;
      transform: translate(0.06em, -0.06em);
      border: 0.04em solid $blackout;

      .lamp-outer {
        $light-color: var(--light-color);

        transition: box-shadow 25ms linear;

        &.off {
          --light-color: var(--light-color-off);
        }

        &.on {
          --light-color: var(--light-color-on);

          .lamp-inner {
            box-shadow: 0 0 1em $light-color-on;
          }
        }

        background-color: $light-color;

        box-shadow: -0.02em 0.02em 0 0 $light-color;
        transform: translate(0.02em, -0.02em);

        .lamp-inner {
          position: absolute;

          width: calc(100% - 0.06em * 1.75);
          height: calc(100% - 0.06em * 1.75);

          top: 0.04em;
          right: 0.04em;

          border: 0.03em solid $blackout;
        }
      }
    }
  }
</style>
