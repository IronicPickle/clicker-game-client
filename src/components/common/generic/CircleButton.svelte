<script lang="ts">
  import colors from "@constants/colors";

  import type { ClassName, Color, Style } from "@ts/generic";
  import { classNames, styles } from "@utils/generic";
  import pSBC from "@utils/pSBC";

  export let on = false;

  export let size: string = "64px";
  export let iconColor: Color = "blackout";
  export let baseColor: Color = "wetlandsSwamp";
  export let bgColor: Color = "redWineVinegar";
  export let lampColor: Color | undefined = undefined;
  export let borderColor: Color = "blackout";
  export let rimColor: Color = "blackout";

  export let type: "button" | "menu" | "reset" | "submit" = "button";
  export let disabled: boolean = false;

  export let className: ClassName = undefined;
  export let style: Style = undefined;
</script>

<button
  class={classNames("circle-button", className, on && "on", lampColor && "is-lamp")}
  style={styles({
    "--icon-color": colors[iconColor],
    "--hover-icon-color": pSBC(-0.3, colors[iconColor]),

    "--base-color": colors[baseColor],
    "--hover-base-color": pSBC(-0.3, colors[baseColor]),

    ...(lampColor
      ? {
          "--lamp-color-on": colors[lampColor],
          "--lamp-color-off": pSBC(-0.5, colors[lampColor]),
          "--hover-lamp-color": pSBC(-0.5, colors[lampColor]),
        }
      : {
          "--lamp-color-on": pSBC(-0.5, colors[bgColor]),
          "--lamp-color-off": colors[bgColor],
          "--hover-lamp-color": pSBC(-0.3, colors[bgColor]),
        }),

    "--border-color": colors[borderColor],
    "--rim-color": colors[rimColor],

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
  .circle-button {
    $rim-color: var(--rim-color);
    $border-color: var(--border-color);

    $size: var(--size);

    --active-lamp-color: var(--lamp-color-off);
    --active-icon-color: var(--icon-color);
    --active-base-color: var(--base-color);

    $active-lamp-color: var(--active-lamp-color);
    $active-icon-color: var(--active-icon-color);
    $active-base-color: var(--active-base-color);

    border: none;
    background-color: transparent;

    width: $size;
    height: $size;
    font-size: $size;

    @mixin active {
      --active-lamp-color: var(--lamp-color-on);

      &.is-lamp {
        .base-outer {
          .base-inner {
            box-shadow: 0 0 1em $active-lamp-color;
          }
        }
      }

      .base-outer {
        .base-inner {
          .lamp-outer {
            box-shadow: 0 0 0 0 $active-lamp-color;
            transform: translate(0, 0);
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

      &:hover:not(.on):not(:active) {
        --active-lamp-color: var(--hover-lamp-color);
      }
    }

    &:active,
    &.on {
      @include active;
    }

    .base-outer {
      background-color: $active-base-color;
      box-shadow: -0.02em 0.02em 0 0.06em $active-base-color;
      transform: translate(0.06em, -0.06em);

      transition-property: background-color, box-shadow;
      transition-timing-function: ease;
      transition-duration: 300ms;

      .base-inner {
        border: 0.04em solid $border-color;

        transition: box-shadow 25ms ease;

        .lamp-outer {
          background-color: $active-lamp-color;
          box-shadow: -0.02em 0.02em 0 0 $active-lamp-color;

          transform: translate(0.02em, -0.02em);

          transition-property: background-color, box-shadow, transform;
          transition-timing-function: ease;
          transition-duration: 300ms;

          .lamp-inner {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;

            width: calc(100% - 0.06em * 1.75);
            height: calc(100% - 0.06em * 1.75);

            top: 0.04em;
            right: 0.04em;

            border: 0.03em solid $rim-color;

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
