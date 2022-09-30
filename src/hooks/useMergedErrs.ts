import type { ApiErrors } from "@api/api";
import { isBoolean } from "@shared/utils/generic";
import { derived, get, Readable } from "svelte/store";

export default <F, A>(formErrs: Readable<ApiErrors<F>>, apiErrs: Readable<ApiErrors<A>>) => {
  return derived(
    [formErrs, apiErrs],
    ([formErrs, apiErrs], set) => {
      const mergedErrs = Object.keys({ ...formErrs, ...apiErrs }).reduce((acc, name) => {
        const formErr = formErrs[name as keyof ApiErrors<F>] as string[] | boolean | undefined;
        const apiErr = apiErrs[name as keyof ApiErrors<A>] as string[] | boolean | undefined;

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
      }, {} as ApiErrors<F>);

      set(mergedErrs);
    },
    get(formErrs),
  );
};
