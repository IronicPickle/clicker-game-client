<script lang="ts">
  import { classNames } from "@utils/generic";
  import { createEventDispatcher } from "svelte";

  type $$Events = {
    submit: SubmitEvent & {
      currentTarget: EventTarget & HTMLFormElement;
    };
  };

  let className: string = "";
  export { className as class };
  export let id: string = "";
  export let style: string = "";

  const disaptch = createEventDispatcher<{
    submit: SubmitEvent & {
      currentTarget: EventTarget & HTMLFormElement;
    };
  }>();

  const handleSubmit = (
    event: SubmitEvent & {
      currentTarget: EventTarget & HTMLFormElement;
    },
  ) => {
    event.stopPropagation();
    event.preventDefault();
    disaptch("submit", event);
  };
</script>

<form class={classNames("form", className)} {id} {style} on:submit={handleSubmit}>
  <slot />
</form>

<style lang="scss">
  form {
    position: relative;
  }
</style>
