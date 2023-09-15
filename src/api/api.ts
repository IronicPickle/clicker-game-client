import axios, { AxiosError } from "axios";
import config from "@config/config";
import StorageItem from "@utils/StorageItem";
import { log } from "@utils/generic";
import type { ApiError } from "@shared/ts/api/generic";
import { GenericErrorCode } from "@shared/enums/api/generic";

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

api.interceptors.response.use(
  async res => res,
  async (err: AxiosError<ApiError<any>>) => {
    const isUnauthorised = err.response?.status === 401;

    if (isUnauthorised) {
      throw err;
    }

    throw err;
  },
);

export const isAxiosError = <K extends string | number | symbol>(
  err: any,
): err is AxiosError<ApiError<K>> => err.isAxiosError;

export const getErrorFromApiErr = <K extends string | number | symbol>(err: any): ApiError<K> => {
  log(err);
  if (isAxiosError<K>(err)) {
    const data = err.response?.data;
    if (data) return data;
  }

  return { error: err.message ?? err, errorCode: GenericErrorCode.AxiosError } as ApiError<K>;
};
