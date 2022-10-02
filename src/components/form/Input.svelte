<script lang="ts">
  import colors from "@constants/colors";
  import type { Color } from "@ts/generic";
  import { classNames, styles } from "@utils/generic";
  import pSBC from "@utils/pSBC";
  import type { ChangeData } from "@ts/form";
  import { createEventDispatcher } from "svelte";

  type $$Events = {
    change: CustomEvent<ChangeData<any, string>>;
  };

  export let value: string;

  export let size: string = "64px";

  export let textColor: Color = "white";
  export let bgColor: Color = "scrub";
  export let baseColor: Color = "pianoBlack";
  export let borderColor: Color = "blackout";
  export let rimColor: Color = "ultimateGray";

  export let type: "text" | "password" | "email" | "number" | "url" | undefined = undefined;
  export let name: any;
  export let placeholder: string | undefined = undefined;

  export let readonly: boolean = false;
  export let disabled: boolean = false;

  export let autocomplete: boolean = false;

  export let errs: string[] | undefined = undefined;

  let className: string = "";
  export { className as class };
  export let id: string = "";
  export let style: string = "";

  const dispatch = createEventDispatcher<{
    change: ChangeData<any, string>;
  }>();

  const dispatchChange = (value: string) => {
    dispatch("change", {
      value,
      name,
    });
  };
</script>

<label
  class={classNames("input", className)}
  {id}
  style={styles({
    "--text-color": colors[textColor],
    "--placeholder-text-color": pSBC(-0.5, colors[textColor]),

    "--base-color": colors[baseColor],
    "--hover-base-color": pSBC(-0.3, colors[baseColor]),

    "--focus-input-color": pSBC(-0.5, colors[bgColor]),
    "--input-color": colors[bgColor],
    "--hover-input-color": pSBC(-0.3, colors[bgColor]),

    "--border-color": colors[borderColor],
    "--rim-color": errs ? colors.red : colors[rimColor],

    "--size": size,
  }) + style}
>
  <div class="base-outer">
    <div class="base-inner">
      <div class="input-outer">
        <input
          class="input-inner"
          {value}
          {type}
          {name}
          {placeholder}
          {readonly}
          {disabled}
          autocomplete={autocomplete ? "on" : "off"}
          on:change={({ currentTarget: { value } }) => dispatchChange(value)}
          on:blur
          on:focus
          on:click
          on:mousedown
          on:mouseup
        />
      </div>
    </div>
  </div>
</label>

<style lang="scss">
  .input {
    $text-color: var(--text-color);
    $placeholder-text-color: var(--placeholder-text-color);
    $rim-color: var(--rim-color);
    $border-color: var(--border-color);

    $size: var(--size);

    --active-input-color: var(--input-color);
    --active-base-color: var(--base-color);

    $active-input-color: var(--active-input-color);
    $active-base-color: var(--active-base-color);

    display: block;

    border: none;
    background-color: transparent;

    min-height: $size;
    height: $size;
    font-size: $size;

    @mixin active {
      --active-input-color: var(--focus-input-color);

      .base-outer {
        .base-inner {
          .input-outer {
            box-shadow: -0.02em 0.02em 0 0.05em $border-color;
            transform: translate(0.03em, -0.03em);
          }
        }
      }
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:not(:disabled) {
      cursor: text;

      &:hover {
        --active-base-color: var(--hover-base-color);
      }

      &:hover:not(:focus-within) {
        --active-input-color: var(--hover-input-color);
      }
    }

    &:focus-within {
      @include active;
    }

    .base-outer {
      width: 100%;
      height: 100%;

      background-color: $active-base-color;
      box-shadow: -0.025em 0.025em 0 0.05em $active-base-color;
      border-radius: 0.07em;
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

        .input-outer {
          display: flex;
          align-items: center;
          justify-content: center;

          height: 100%;

          padding: 0.05em 0.25em;

          background-color: $active-input-color;
          box-shadow: -0.03em 0.03em 0 0.05em $border-color;
          border-width: 0.05em 0.05em 0.04em 0.04em;
          border-style: inset;
          border-color: $rim-color;
          border-radius: 0.06em;

          font-size: inherit;

          transform: translate(0.045em, -0.045em);

          box-sizing: border-box;

          transition-property: background-color, box-shadow, border, transform;
          transition-timing-function: ease;
          transition-duration: 300ms;

          .input-inner {
            outline: none;
            border: none;
            background-color: transparent;

            width: 100%;
            height: 100%;

            color: $text-color;
            font-weight: 700;
            font-size: 0.4em;
            @include sevenSegment();

            &::placeholder {
              color: $placeholder-text-color;
            }
          }
        }
      }
    }
  }
</style>
