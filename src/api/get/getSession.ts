import { api } from "@api/api";
import type { GetSessionReq, GetSessionRes } from "@shared/ts/api/session";

export default async ({ id }: GetSessionReq) => {
  const { data } = await api.get<GetSessionRes>(`/session/${id}`);
  return data;
};
