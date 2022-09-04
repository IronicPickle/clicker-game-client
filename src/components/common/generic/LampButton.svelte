<script lang="ts">
  import colors from "@constants/colors";

  import type { ClassName, Color, Style } from "@ts/generic";
  import { classNames, styles } from "@utils/generic";
  import pSBC from "@utils/pSBC";

  export let on = false;

  export let size: string = "64px";
  export let iconColor: Color = "blackout";
  export let baseColor: Color = "wetlandsSwamp";
  export let lampColor: Color = "hotLips";

  export let type: "button" | "menu" | "reset" | "submit" = "button";
  export let disabled: boolean = false;

  export let className: ClassName = undefined;
  export let style: Style = undefined;
</script>

<button
  class={classNames("lamp-button", className, on ? "on" : "off")}
  style={styles({
    "--icon-color": colors[iconColor],
    "--hover-icon-color": pSBC(-0.3, colors[iconColor]),
    "--base-color": colors[baseColor],
    "--hover-base-color": pSBC(-0.3, colors[baseColor]),
    "--lamp-color-off": pSBC(-0.5, colors[lampColor]),
    "--lamp-color-on": colors[lampColor],
    "--size": size,
    ...style,
  })}
  {type}
  {disabled}
  on:click
>
  <div class="base-outer">
    <div class="base-inner">
      <div class="lamp-outer">
        <div class="lamp-inner">
          <slot />
        </div>
      </div>
    </div>
  </div>
</button>

<style lang="scss">
  .lamp-button {
    $lamp-rim-color: $blackout;

    $size: var(--size);

    --active-lamp-color: var(--lamp-color-off);
    --active-icon-color: var(--icon-color);
    --active-base-color: var(--base-color);

    $active-lamp-color: var(--active-lamp-color);
    $active-icon-color: var(--active-icon-color);
    $active-base-color: var(--active-base-color);

    border: none;
    background-color: transparent;
    border-radius: 50%;
    box-shadow: -0.02em 0.02em 0.4em $blackout;

    width: $size;
    height: $size;
    font-size: $size;

    @mixin active {
      box-shadow: 0 0 0 0 $active-lamp-color;
      transform: translate(0, 0);
    }

    &.off {
      --active-lamp-color: var(--lamp-color-off);
    }

    &.on {
      --active-lamp-color: var(--lamp-color-on);

      .base-outer {
        .base-inner {
          box-shadow: 0 0 1em $active-lamp-color;
          .lamp-outer {
            @include active;
          }
        }
      }
    }

    & * {
      width: 100%;
      height: 100%;

      border-radius: 50%;

      box-sizing: border-box;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:not(:disabled) {
      cursor: pointer;

      &:hover {
        --active-base-color: var(--hover-base-color);
        --active-icon-color: var(--hover-icon-color);
      }
      &:active {
        .base {
          .lamp-outer {
            @include active;
          }
        }
      }
    }

    .base-outer {
      background-color: $active-base-color;
      box-shadow: -0.02em 0.02em 0 0.06em $active-base-color;
      transform: translate(0.06em, -0.06em);

      transition: box-shadow 300ms ease;

      .base-inner {
        border: 0.04em solid $lamp-rim-color;

        .lamp-outer {
          transition-property: box-shadow, transform;
          transition-timing-function: ease;
          transition-duration: 300ms;

          background-color: $active-lamp-color;

          box-shadow: -0.02em 0.02em 0 0 $active-lamp-color;
          transform: translate(0.02em, -0.02em);

          .lamp-inner {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;

            width: calc(100% - 0.06em * 1.75);
            height: calc(100% - 0.06em * 1.75);

            top: 0.04em;
            right: 0.04em;

            border: 0.03em solid $lamp-rim-color;

            :global(*) {
              width: 0.5em;
              height: 0.5em;

              color: $active-icon-color;

              transition: color 300ms ease;
            }
          }
        }
      }
    }
  }
</style>
