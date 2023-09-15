import { purgeUndefined } from "@utils/generic";
import { derived, Readable } from "svelte/store";

export default (
  isLoadings: Array<Readable<boolean> | undefined>,
  messages: string[],
): Readable<string | undefined> =>
  derived(purgeUndefined(isLoadings), (isLoadings, set) => {
    const index = isLoadings.findIndex(isLoading => isLoading);
    set(messages[index]);
  });
