<script lang="ts">
  import Form from "@components/common/form/Form.svelte";
  import FormEntry from "@components/common/form/FormEntry.svelte";
  import FormRow from "@components/common/form/FormRow.svelte";
  import Input from "@components/common/form/Input.svelte";
  import useForm from "@hooks/useForm";
  import useStorageItem from "@hooks/useStorageItem";
  import sessionValidators from "@shared/validators/sessionValidators";
  import IoMdArrowRoundForward from "svelte-icons/io/IoMdArrowRoundForward.svelte";
  import CircleButton from "@components/common/generic/CircleButton.svelte";
  import useMergedValidation from "@hooks/useMergedValidation";
  import { getGlobalContext } from "@components/context/global/GlobalContext.svelte";

  let className: string = "";
  export { className as class };
  export let id: string = "";
  export let style: string = "";

  const sessionItem = useStorageItem<string>("sessionId");

  const { createSession, createSessionIsLoading, createSessionError } = getGlobalContext();

  const { values, validation, onChange, onSubmit } = useForm(
    {
      displayName: "",
    },
    async values => {
      if (!createSession) return;
      const { data } = await createSession(values);
      if (data) sessionItem.set(data.id);
    },
    sessionValidators.create,
  );

  const mergedValidation = useMergedValidation(validation, createSessionError);
</script>

<Form on:submit={onSubmit} class={className} {id} {style}>
  <FormRow {style}>
    <FormEntry name="displayName" errs={$mergedValidation.displayName}>
      <Input
        name="displayName"
        placeholder="Display Name"
        value={$values.displayName}
        on:change={({ detail }) => onChange(detail)}
        errs={$mergedValidation.displayName}
      />
    </FormEntry>

    <CircleButton
      size="64px"
      baseColor="wetlandsSwamp"
      rimColor="lemonDrop"
      iconColor="white"
      type="submit"
      disabled={$createSessionIsLoading}
      on:click
    >
      <IoMdArrowRoundForward />
    </CircleButton>
  </FormRow>
</Form>
