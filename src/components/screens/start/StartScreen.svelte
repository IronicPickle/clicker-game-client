<script lang="ts">
  import useCreateSession from "@api/put/hooks/useCreateSession";
  import Button from "@components/common/generic/Button.svelte";
  import DataCheck from "@components/common/generic/DataCheck.svelte";
  import Input from "@components/form/Input.svelte";
  import useForm from "@hooks/useForm";
  import IoIosCog from "svelte-icons/io/IoIosCog.svelte";
  import { backIn } from "svelte/easing";
  import { fly } from "svelte/transition";
  import sessionValidators from "@shared/validators/sessionValidators";
  import useMergedErrs from "@hooks/useMergedErrs";
  import useStorageItem from "@hooks/useStorageItem";
  import { getGlobalContext } from "@components/context/global/GlobalContext.svelte";

  const { session, sessionIsLoading, sessionErrs } = getGlobalContext();

  const sessionItem = useStorageItem<string>("sessionId");
  const { send: create, errs: apiErrs } = useCreateSession();

  const {
    values,
    errs: formErrs,
    onChange,
  } = useForm(
    {
      displayName: "Testing",
    },
    sessionValidators.create,
  );

  const createSession = async () => {
    const { data } = await create($values);
    if (data) sessionItem.set(data.id);
  };

  const mergedErrs = useMergedErrs(formErrs, apiErrs);
</script>

<div class="start-screen">
  <div
    class="shadow-wrapper"
    transition:fly={{
      y: -(window.innerHeight / 2),
      easing: backIn,
      duration: 700,
    }}
  >
    <div class="wrapper">
      <DataCheck isLoading={$sessionIsLoading} errs={[$mergedErrs, $sessionErrs]}>
        <h1 class="title">Clicker Punk</h1>

        {#if $session}
          <Button
            size="128px"
            baseColor="wetlandsSwamp"
            bgColor="redWineVinegar"
            rimColor="lemonDrop"
            on:click>Start Game</Button
          >
        {:else}
          <Input
            name={"displayName"}
            value={$values.displayName}
            on:change={({ detail }) => onChange(detail)}
          />

          <Button on:click={createSession}>Submit</Button>
        {/if}

        <div class="cogs">
          <div class="cog-wrapper"><IoIosCog /></div>
          <div class="cog-wrapper"><IoIosCog /></div>
        </div>
      </DataCheck>
    </div>
  </div>
</div>

<style lang="scss">
  .start-screen {
    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;

    z-index: 100;

    .shadow-wrapper {
      border-radius: 30px;
      box-shadow: 0 0 20px $black;

      .wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;

        padding: 20px 40px 50px 40px;

        background-color: $sandalwood;

        border-color: $lemonDrop;
        border-style: ridge;
        border-width: 15px;

        box-shadow: 0 0 0 15px darken($sandalwood, 0.3);

        border-radius: 30px;

        overflow: hidden;

        .title {
          color: $white;
          font-size: 128px;

          @include rye(400);

          z-index: 100;
        }

        :global(.button-wrapper) {
          font-size: 64px;

          z-index: 100;
        }

        .cog-wrapper {
          position: absolute;
          bottom: 0;

          @include size(512px);

          color: $brimstone;

          &:first-of-type {
            left: 0;

            transform: translate(-55%, 45%);

            :global(svg) {
              animation-name: spin;
              animation-duration: 2s;
              animation-timing-function: ease;
              animation-iteration-count: infinite;
            }
          }

          &:last-of-type {
            right: 0;

            transform: translate(55%, 45%);

            :global(svg) {
              animation-name: spin;
              animation-duration: 10s;
              animation-timing-function: linear;
              animation-iteration-count: infinite;
              animation-direction: reverse;
            }
          }
        }
      }
    }
  }
</style>
