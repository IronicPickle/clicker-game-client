import type { ApiError, ValidationErrors } from "@shared/ts/api/generic";
import { isBoolean } from "@shared/utils/generic";
import { derived, get, Readable } from "svelte/store";

export default <F, A>(
  formErrs: Readable<ValidationErrors<keyof F>>,
  apiErrs?: Readable<ApiError<keyof A> | undefined>,
) => {
  if (!apiErrs) return formErrs;
  return derived(
    [formErrs, apiErrs],
    ([formErrs, apiErrs], set) => {
      if (!apiErrs) return set(formErrs);
      const mergedErrs = Object.keys({ ...formErrs, ...apiErrs.validation }).reduce((acc, name) => {
        const formErr = formErrs[name as keyof ValidationErrors<keyof F>] as
          | string[]
          | boolean
          | undefined;
        const apiErr = apiErrs.validation[name as keyof ApiError<keyof A>["validation"]] as
          | string[]
          | boolean
          | undefined;

        if (isBoolean(formErr) && isBoolean(apiErr)) {
          return { ...acc, [name]: formErr || apiErr };
        } else if ((formErr || apiErr) && !isBoolean(formErr) && !isBoolean(apiErr)) {
          const err = [...(formErr ?? []), ...(apiErr ?? [])].reduce(
            (acc, err) => (acc.includes(err) ? acc : [...acc, err]),
            [] as string[],
          );
          return { ...acc, [name]: err };
        }
        return acc;
      }, {} as ValidationErrors<keyof F>);

      set(mergedErrs);
    },
    get(formErrs),
  );
};
