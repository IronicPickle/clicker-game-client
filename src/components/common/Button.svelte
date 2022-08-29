<script lang="ts">
  import colors from "@constants/colors";
  import type { ClassName, Color, Style } from "@ts/generic";

  import { classNames, styles } from "@utils/generic";
  import pSBC from "@utils/pSBC";

  export let variant: "contained" | "flat" = "contained";
  export let size: "small" | "medium" | "large" = "medium";

  export let textColor: Color = "white";
  export let bgColor: Color = "redWineVingegar";
  export let borderColor: Color = "lemonDrop";

  export let type: "button" | "menu" | "reset" | "submit" = "button";
  export let disabled: boolean = false;

  export let className: ClassName = undefined;
  export let style: Style = undefined;

  const hoverDarken = {
    contained: -0.3,
    flat: 0.8,
  }[variant];
</script>

<button
  style={styles({
    "--text-color": colors[textColor],

    "--bg-color": colors[bgColor],
    "--hover-bg-color": pSBC(hoverDarken, colors[bgColor]),

    "--border-color": colors[borderColor],
    ...style,
  })}
  {type}
  {disabled}
  class={classNames("button", variant, size, className)}
>
  <slot />
</button>

<style lang="scss">
  $text-color: var(--text-color);

  $bg-color: var(--bg-color);
  $hover-bg-color: var(--hover-bg-color);

  $border-color: var(--border-color);

  button {
    height: 2em;

    padding: 0 1em;

    border: none;
    background-color: transparent;
    border-radius: 0.2em;

    font-weight: 700;

    cursor: pointer;
    box-sizing: border-box;

    &:disabled {
      cursor: not-allowed;
    }

    &.small {
      font-size: 14px;
    }
    &.medium {
      font-size: 18px;
    }
    &.large {
      font-size: 24px;
    }

    &.contained {
      background-color: $bg-color;

      border-color: $border-color;
      border-style: ridge;
      border-width: 0.15em;

      box-shadow: -0.1em 0.1em 0 0.3em $hover-bg-color;

      color: $text-color;

      transition-property: background-color, box-shadow, transform;
      transition-timing-function: ease;
      transition-duration: 300ms;

      &:not(:disabled) {
        &:hover {
          background-color: $hover-bg-color;
        }
        &:active {
          box-shadow: -0.05em 0.05em 0 0.25em $bg-color;
          transform: translate(-0.15em, 0.15em);
        }
      }
    }

    &.flat {
      color: $text-color;

      transition-property: background-color;
      transition-timing-function: ease;
      transition-duration: 300ms;

      &:not(:disabled) {
        &:hover {
          background-color: $hover-bg-color;
        }
      }
    }
  }
</style>
