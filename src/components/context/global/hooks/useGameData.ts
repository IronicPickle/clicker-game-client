import useGetGameData from "@api/get/hooks/useGetGameData";
import type { GetSessionRes } from "@src/../../clicker-game-shared/ts/api/session";
import { derived, Readable } from "svelte/store";
import { GetGameDataErrorCode } from "@shared/enums/api/gameData";
import useCreateGameData from "@api/put/hooks/useCreateGameData";
import type {
  CreateGameDataRes,
  GetGameDataRes,
} from "@src/../../clicker-game-shared/ts/api/gameData";

export default (session: Readable<GetSessionRes | undefined>) => {
  const {
    isLoading: getIsLoading,
    error: getError,
    data: getGameData,
    send: get,
    reset: resetGet,
  } = useGetGameData();

  const {
    isLoading: createIsLoading,
    error: createError,
    data: createGameData,
    send: create,
  } = useCreateGameData();

  session.subscribe(async sessionData => {
    if (!sessionData) return;
    const { id } = sessionData;
    const { error } = await get({ sessionId: id });

    if (error?.errorCode === GetGameDataErrorCode.NoGameDataForSession) {
      resetGet();
      await create({ sessionId: id });
    }
  });

  const gameData: Readable<CreateGameDataRes | GetGameDataRes | undefined> = derived(
    [getGameData, createGameData],
    ([getGameData, createGameData], set) => {
      set(getGameData ?? createGameData);
    },
  );

  return { getIsLoading, getError, gameData, createIsLoading, createError };
};
