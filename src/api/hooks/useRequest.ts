import { getErrorFromApiErr } from "@api/api";
import type { ApiError } from "@shared/ts/api/generic";
import { derived, writable } from "svelte/store";
import useRequestState from "./useRequestState";

export type RequestRes<R, D> = {
  data?: R;
  error?: ApiError<keyof D>;
};

export default <D, R, F = undefined>(func: (reqData: D) => Promise<R>, defaultValue: F) => {
  const { reqState, setIdle, setLoading, setSuccess, setError } = useRequestState<D, R | F>(
    defaultValue,
  );

  const resPromise = writable<Promise<R | undefined>>();

  const send = async (reqData: D): Promise<RequestRes<R, D>> => {
    try {
      setLoading();
      const res = func(reqData);
      resPromise.set(res);
      const data = await res;
      setSuccess(data);
      return { data };
    } catch (err) {
      const error = getErrorFromApiErr<keyof D>(err);
      setError(error);
      return { error };
    }
  };

  const isLoading = derived(reqState, ({ isLoading }, set: (isLoading: boolean) => void) =>
    set(isLoading),
  );
  const error = derived(reqState, ({ error }, set: (error?: ApiError<keyof D>) => void) =>
    set(error),
  );
  const data = derived(reqState, ({ data }, set: (data?: R | F) => void) => set(data));

  return { promise: resPromise, send, isLoading, error, data, reset: setIdle };
};
