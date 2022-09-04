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

  export let className: ClassName = undefined;
  export let style: Style = undefined;
</script>

<div
  class={classNames("lamp", className, on ? "on" : "off")}
  style={styles({
    "--icon-color": colors[iconColor],
    "--base-color": colors[baseColor],
    "--lamp-color-off": pSBC(-0.5, colors[lampColor]),
    "--lamp-color-on": colors[lampColor],
    "--size": size,
    ...style,
  })}
>
  <div class="base-outer">
    <div class="base-inner">
      <div class="struts">
        <div>
          <div class="strut top" />
          <div class="strut top" />
        </div>

        <div>
          <div class="strut right" />
          <div class="strut right" />
        </div>

        <div>
          <div class="strut bottom" />
          <div class="strut bottom" />
        </div>

        <div>
          <div class="strut left" />
          <div class="strut left" />
        </div>
      </div>
      <div class="lamp-outer">
        <div class="lamp-inner">
          <div class="braces">
            <div>
              <div class="brace vertical" />
              <div class="brace vertical" />
            </div>

            <div>
              <div class="brace horizontal" />
              <div class="brace horizontal" />
            </div>
          </div>

          <slot />
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .lamp {
    $icon-color: var(--icon-color);
    $base-color: var(--base-color);
    $lamp-color-off: var(--lamp-color-off);
    $lamp-color-on: var(--lamp-color-on);
    $size: var(--size);
    $lamp-rim-color: $blackout;

    $lamp-color: var(--lamp-color);

    width: $size;
    height: $size;
    font-size: $size;

    &.off {
      --lamp-color: var(--lamp-color-off);
    }

    &.on {
      --lamp-color: var(--lamp-color-on);

      .base-outer {
        .base-inner {
          box-shadow: 0 0 1em $lamp-color-on;
        }
      }
    }

    & * {
      &:not(.brace):not(.strut) {
        width: 100%;
        height: 100%;

        border-radius: 50%;

        box-sizing: border-box;
      }
    }

    border-radius: 50%;
    box-shadow: -0.02em 0.02em 0.4em $blackout;

    .base-outer {
      position: relative;

      background-color: $lamp-color;
      box-shadow: -0.02em 0.02em 0 0.06em $base-color;
      transform: translate(0.06em, -0.06em);

      .base-inner {
        position: relative;
        overflow: hidden;

        border: 0.04em solid $lamp-rim-color;

        .lamp-outer {
          transition: box-shadow 25ms linear;

          transform: translate(0.02em, -0.02em);

          .lamp-inner {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;

            width: calc(100% - 0.1em);
            height: calc(100% - 0.1em);

            top: 0.05em;
            right: 0.05em;

            border: 0.03em solid $lamp-rim-color;
            background-color: $lamp-color;

            z-index: 100;

            :global(svg) {
              position: absolute;

              width: 0.4em;
              height: 0.4em;
              padding: 0.04em;

              background-color: $lamp-color;
              border-radius: 50%;
              border: 0.03em solid $lamp-rim-color;

              color: $icon-color;

              transform: translate(0.01em, -0.01em);
            }

            .braces {
              position: absolute;
              .brace {
                position: absolute;
                border-color: $lamp-rim-color;
                border-width: 0.03em;

                &.vertical {
                  height: 100%;

                  top: 0;

                  border-style: none solid none none;

                  &:first-of-type {
                    left: 30%;
                  }

                  &:last-of-type {
                    right: 30%;
                  }
                }

                &.horizontal {
                  width: 100%;

                  left: 0;

                  border-style: solid none none none;

                  &:first-of-type {
                    top: 30%;
                  }

                  &:last-of-type {
                    bottom: 30%;
                  }
                }
              }
            }
          }
        }

        .struts {
          position: absolute;
          .strut {
            position: absolute;
            border-color: $lamp-rim-color;
            border-width: 0.03em;

            &.top {
              height: 25%;

              top: 0;

              border-style: none solid none none;

              transform-origin: top;

              &:first-of-type {
                left: 30%;

                transform: rotate(-45deg);
              }

              &:last-of-type {
                right: 37%;

                transform: rotate(-45deg);
              }
            }

            &.right {
              width: 25%;

              right: 0;

              border-style: solid none none none;

              transform-origin: right;

              &:first-of-type {
                top: 37%;

                transform: rotate(45deg);
              }

              &:last-of-type {
                bottom: 30%;

                transform: rotate(45deg);
              }
            }

            &.bottom {
              height: 25%;

              bottom: 0;

              border-style: none solid none none;

              transform-origin: bottom;

              &:first-of-type {
                left: 23%;

                transform: rotate(45deg);
              }

              &:last-of-type {
                right: 42%;

                transform: rotate(45deg);
              }
            }

            &.left {
              width: 25%;

              left: 0;

              border-style: solid none none none;

              transform-origin: left;

              &:first-of-type {
                top: 42%;

                transform: rotate(-45deg);
              }

              &:last-of-type {
                bottom: 23%;

                transform: rotate(-45deg);
              }
            }
          }
        }
      }
    }
  }
</style>
