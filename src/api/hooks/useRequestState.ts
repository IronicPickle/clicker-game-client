import type { ApiErrors } from "@api/api";
import { writable } from "svelte/store";

export type CurrentReqState<D, R> = {
  isLoading: boolean;
  data?: R;
  errs: ApiErrors<D>;
};

const useRequestState = <D, R>(defaultData?: R) => {
  const createReqState = (
    isLoading: boolean,
    data?: R,
    errs: ApiErrors<D> = { failed: false } as ApiErrors<D>,
  ): CurrentReqState<D, R> => ({
    isLoading,
    data,
    errs,
  });

  const reqState = writable<CurrentReqState<D, R>>(createReqState(false, defaultData));

  const setIdle = () => {
    const newReqState = createReqState(false, defaultData);
    reqState.set(newReqState);
    return newReqState;
  };
  const setLoading = () => {
    const newReqState = createReqState(true, defaultData);
    reqState.set(newReqState);
    return newReqState;
  };
  const setSuccess = (data: R) => {
    const newReqState = createReqState(false, data);
    reqState.set(newReqState);
    return newReqState;
  };
  const setErrs = (errs: ApiErrors<D>) => {
    const newReqState = createReqState(false, defaultData, errs);
    reqState.set(newReqState);
    return newReqState;
  };

  return { reqState, setIdle, setLoading, setSuccess, setErrs };
};

export default useRequestState;
