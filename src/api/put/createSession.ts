import { api } from "@api/api";
import type { CreateSessionRes, CreateSessionReq } from "@shared/ts/api/session";

export default async (body: CreateSessionReq) => {
  const { data } = await api.put<CreateSessionRes>("/session/create", body);
  return data;
};
