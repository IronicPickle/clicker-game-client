import axios, { AxiosError } from "axios";
import config from "@config/config";
import StorageItem from "@utils/StorageItem";
import { log } from "@utils/generic";

export interface APIResponsePaginated<T> {
  items: T[];
  nextToken: string | null;
}
export interface APIResponseArray<T> {
  items: T[];
}

export interface APIResponseData<T> {
  data: T[];
}

export const api = axios.create({
  baseURL: config.apiURL,
});

const sessionStorage = new StorageItem<string>("sessionId");

api.interceptors.request.use(async config => {
  try {
    const { data: sessionId, error } = sessionStorage.get();
    if (error) throw error;

    if (sessionId != null) {
      config.headers = config.headers ?? {};
      config.headers["Authorization"] = `Bearer ${sessionId}`;
    }
  } catch (err) {
    log(err);
  }

  return config;
});

export type ApiErrors<D> = {
  failed: boolean;
  generic?: string[];
} & Partial<Record<keyof D, string[]>>;

interface ErrorData<D> {
  message: ApiErrors<D>;
}

api.interceptors.response.use(
  async res => res,
  async (err: AxiosError<ErrorData<any>>) => {
    const isUnauthorised = err.response?.status === 401;

    if (isUnauthorised) {
      throw err;
    }

    throw err;
  },
);

export const isAxiosError = <D>(err: any): err is AxiosError<ErrorData<D>> => err.isAxiosError;

export const getErrsFromApiErr = <D>(err: any): ApiErrors<D> => {
  log(err);
  if (isAxiosError<D>(err)) {
    const message = err.response?.data.message;
    if (message) return message;
  }

  return { failed: true, generic: err.message ?? err } as ApiErrors<D>;
};
