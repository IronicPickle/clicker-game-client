import { api } from "@api/api";
import type { GetGameDataReq, GetGameDataRes } from "@shared/ts/api/gameData";

export default async ({ id, sessionId }: GetGameDataReq) => {
  const { data } = await api.get<GetGameDataRes>(`/gameData`, {
    params: {
      id,
      sessionId,
    },
  });
  return data;
};
