import useGetSession from "@api/get/hooks/useGetSession";
import useCreateSession from "@api/put/hooks/useCreateSession";
import useStorageItem from "@hooks/useStorageItem";
import type {
  CreateSessionRes,
  GetSessionRes,
} from "@src/../../clicker-game-shared/ts/api/session";
import { derived, get, Readable } from "svelte/store";

export default () => {
  const sessionItem = useStorageItem<string>("sessionId");

  const {
    isLoading: getIsLoading,
    error: getError,
    data: sessionFromGet,
    send: getSession,
  } = useGetSession();
  const {
    isLoading: createIsLoading,
    error: createError,
    data: sessionFromCreate,
    send: create,
  } = useCreateSession();

  const session: Readable<CreateSessionRes | GetSessionRes | undefined> = derived(
    [sessionFromGet, sessionFromCreate],
    ([sessionFromGet, sessionFromCreate], set) => {
      set(sessionFromGet ?? sessionFromCreate);
    },
  );

  sessionItem.item.subscribe(({ data }) => {
    if (data && !get(session)) getSession({ id: data });
  });

  return { getIsLoading, getError, session, createIsLoading, createError, create };
};
