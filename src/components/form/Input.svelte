<script lang="ts">
  import colors from "@constants/colors";
  import type { ClassName, Color, Style } from "@ts/generic";
  import { classNames, styles } from "@utils/generic";
  import pSBC from "@utils/pSBC";
  import type { ChangeData } from "@ts/form";
  import { createEventDispatcher } from "svelte";

  interface $$Events {
    change: CustomEvent<ChangeData<any, string>>;
  }

  export let value: string;

  export let textColor: Color = "white";
  export let bgColor: Color = "redWineVinegar";

  export let baseColor: Color = "wetlandsSwamp";

  export let size: string = "64px";

  export let type: "text" | "password" | "email" | "number" | "url" | undefined = undefined;
  export let name: any;
  export let placeholder: string | undefined = undefined;

  export let readonly: boolean = false;
  export let disabled: boolean = false;

  export let autocomplete: boolean = false;

  export let className: ClassName | undefined = undefined;
  export let style: Style | undefined = undefined;

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

<input
  class={classNames("input", className)}
  style={styles({
    "--text-color": colors[textColor],

    "--base-color": colors[baseColor],
    "--hover-base-color": pSBC(-0.3, colors[baseColor]),
    ...style,
  })}
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
