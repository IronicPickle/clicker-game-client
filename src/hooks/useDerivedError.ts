import type { ApiError } from "@shared/ts/api/generic";
import { purgeUndefined } from "@utils/generic";
import { derived, Readable } from "svelte/store";

export default (
  ...errors: Array<Readable<ApiError<any>> | undefined>
): Readable<string | undefined> =>
  derived(purgeUndefined(errors), (errors, set) => {
    set(errors.find(error => error?.error)?.error);
  });
