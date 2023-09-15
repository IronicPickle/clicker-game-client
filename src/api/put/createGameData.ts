import { api } from "@api/api";
import type {
  CreateGameDataReq,
  CreateGameDataRes,
} from "@src/../../clicker-game-shared/ts/api/gameData";

export default async (body: CreateGameDataReq) => {
  const { data } = await api.put<CreateGameDataRes>("/gameData/create", body);
  return data;
};
