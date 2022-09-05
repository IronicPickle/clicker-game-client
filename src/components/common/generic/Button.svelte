<script lang="ts">
  import colors from "@constants/colors";
  import App from "@src/App.svelte";
  import type { ClassName, Color, Style } from "@ts/generic";

  import { classNames, styles } from "@utils/generic";
  import pSBC from "@utils/pSBC";

  export let on = false;

  export let size: string = "64px";

  export let textColor: Color = "white";
  export let bgColor: Color = "redWineVinegar";
  export let lampColor: Color | undefined = undefined;
  export let baseColor: Color = "wetlandsSwamp";
  export let borderColor: Color = "blackout";
  export let rimColor: Color = "blackout";

  export let type: "button" | "menu" | "reset" | "submit" = "button";
  export let disabled: boolean = false;

  export let className: ClassName = undefined;
  export let style: Style = undefined;
</script>

<button
  class={classNames("button", className, on && "on", lampColor && "is-lamp")}
  style={styles({
    "--text-color": colors[textColor],

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
      <div class="lamp">
        <div class="text"><slot /></div>
      </div>
    </div>
  </div>
</button>

<style lang="scss">
  .button {
    $text-color: var(--text-color);
    $rim-color: var(--rim-color);
    $border-color: var(--border-color);

    $size: var(--size);

    --active-lamp-color: var(--lamp-color-off);
    --active-base-color: var(--base-color);

    $active-lamp-color: var(--active-lamp-color);
    $active-base-color: var(--active-base-color);

    border: none;
    background-color: transparent;

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
          .lamp {
            box-shadow: -0.02em 0.02em 0 0.05em $active-lamp-color;
            transform: translate(0.03em, -0.03em);
          }
        }
      }
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:not(:disabled) {
      cursor: pointer;

      &:hover {
        --active-base-color: var(--hover-base-color);
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
      width: 100%;
      height: 100%;

      background-color: $active-base-color;
      box-shadow: -0.025em 0.025em 0 0.05em $active-base-color;
      border-radius: 0.15em;
      border: 0.08em solid $border-color;

      transform: translate(0.05em, -0.05em);

      transition-property: background-color, box-shadow;
      transition-timing-function: ease;
      transition-duration: 300ms;
      box-sizing: border-box;

      .base-inner {
        width: 100%;
        height: 100%;

        transition: box-shadow 25ms ease;
        box-sizing: border-box;

        .lamp {
          display: flex;
          align-items: center;
          justify-content: center;

          height: 100%;

          padding: 0.05em 0.25em;

          background-color: $active-lamp-color;
          box-shadow: -0.03em 0.03em 0 0.05em $active-lamp-color;
          border: 0.04em solid $rim-color;
          border-radius: 0.06em;

          color: $text-color;
          font-size: inherit;

          transform: translate(0.045em, -0.045em);

          box-sizing: border-box;

          transition-property: background-color, box-shadow, transform;
          transition-timing-function: ease;
          transition-duration: 300ms;

          .text {
            font-weight: 700;
            font-size: 0.4em;
          }
        }
      }
    }
  }
</style>
