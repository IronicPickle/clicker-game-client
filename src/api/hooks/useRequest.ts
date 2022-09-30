import { ApiErrors, getErrsFromApiErr } from "@api/api";
import { derived, writable } from "svelte/store";
import useRequestState from "./useRequestState";

export default <D, R, F = undefined>(func: (reqData: D) => Promise<R>, defaultValue: F) => {
  const { reqState, setLoading, setSuccess, setErrs } = useRequestState<D, R | F>(defaultValue);

  const resPromise = writable<Promise<R | undefined>>();
  type SendRes = {
    data?: R;
    errs?: ApiErrors<D>;
  };

  const send = async (reqData: D): Promise<SendRes> => {
    try {
      setLoading();
      const res = func(reqData);
      resPromise.set(res);
      const data = await res;
      setSuccess(data);
      return { data };
    } catch (err) {
      const errs = getErrsFromApiErr<D>(err);
      setErrs(errs);
      return { errs };
    }
  };

  const isLoading = derived(reqState, ({ isLoading }, set: (isLoading: boolean) => void) =>
    set(isLoading),
  );
  const errs = derived(reqState, ({ errs }, set: (errs: ApiErrors<D>) => void) =>
    set(errs ?? { failed: false }),
  );
  const data = derived(reqState, ({ data }, set: (data?: R | F) => void) => set(data));

  return { promise: resPromise, send, isLoading, errs, data };
};
