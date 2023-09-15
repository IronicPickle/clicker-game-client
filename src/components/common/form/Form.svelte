<script lang="ts">
  import { classNames, styles } from "@utils/generic";
  import { createEventDispatcher } from "svelte";

  type $$Events = {
    submit: SubmitEvent & {
      currentTarget: EventTarget & HTMLFormElement;
    };
  };

  export let gap: string = "16px";

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

<form
  class={classNames("form", className)}
  {id}
  style={styles({ "--gap": gap }) + style}
  on:submit={handleSubmit}
>
  <slot />
</form>

<style lang="scss">
  form {
    $gap: var(--gap);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $gap;
  }
</style>
