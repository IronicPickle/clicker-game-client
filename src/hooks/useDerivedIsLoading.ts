import { purgeUndefined } from "@utils/generic";
import { derived, Readable } from "svelte/store";

export default (...isLoadings: Array<Readable<boolean> | undefined>): Readable<boolean> =>
  derived(purgeUndefined(isLoadings), (isLoadings, set) => {
    set(isLoadings.some(isLoading => isLoading));
  });
