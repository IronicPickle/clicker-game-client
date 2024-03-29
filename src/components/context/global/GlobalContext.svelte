<script lang="ts" context="module">
  export type Screen = "start" | "game";

  export interface GlobalContext {
    screen: Writable<Screen>;
    rpm: Writable<number>;
    tweenedRpm: Tweened<number>;
    isAccelerating: Writable<boolean>;
    isRunning: Writable<boolean>;

    GearIcon: Writable<typeof SvelteComponent>;

    money: Writable<number>;
    tweenedMoney: Tweened<number>;
    moneyEarned: Writable<{ amount: number }>;

    session?: Readable<GetSessionRes | undefined>;
    sessionIsLoading?: Readable<boolean>;
    sessionError?: Readable<ApiError<keyof GetSessionReq>>;
    createSessionIsLoading?: Readable<boolean>;
    createSessionError?: Readable<ApiError<keyof CreateGameDataReq>>;
    createSession?: (
      reqData: CreateSessionReq,
    ) => Promise<RequestRes<CreateSessionRes, CreateSessionReq>>;

    gameData?: Readable<GetGameDataRes | undefined>;
    gameDataIsLoading?: Readable<boolean>;
    gameDataError?: Readable<ApiError<keyof GetGameDataReq>>;
    createGameDataIsLoading?: Readable<boolean>;
    createGameDataError?: Readable<ApiError<keyof CreateGameDataReq>>;
  }

  const screen = writable<Screen>("start");
  const rpm = writable(0);
  const tweenedRpm = tweened(0);
  const isAccelerating = writable(false);
  const isRunning = writable(false);

  const GearIcon = writable<typeof SvelteComponent>();

  const money = writable(0);
  const tweenedMoney = tweened(0);
  const moneyEarned = writable({ amount: 0 });

  export const defaultGlobalContext: GlobalContext = {
    screen,
    rpm,
    tweenedRpm,
    isAccelerating,
    isRunning,

    GearIcon,

    money,
    tweenedMoney,
    moneyEarned,
  };

  export const getGlobalContext = () => getContext<GlobalContext>("global") ?? defaultGlobalContext;
</script>

<script lang="ts">
  import { Readable, Writable, writable } from "svelte/store";

  import { getContext, setContext, SvelteComponent } from "svelte";
  import { Tweened, tweened } from "svelte/motion";
  import _GearIcon from "@components/common/media/gears/GearIcon1.svelte";
  import useRpmReduction from "./hooks/useRpmReduction";
  import useIsAccelerating from "./hooks/useIsAccelerating";
  import useMoneyEarned, { moneyEarnedInterval } from "./hooks/useMoneyEarned";
  import type {
    CreateSessionReq,
    CreateSessionRes,
    GetSessionReq,
    GetSessionRes,
  } from "@shared/ts/api/session";
  import useSession from "./hooks/useSession";
  import type { ApiError } from "@shared/ts/api/generic";
  import useGameData from "./hooks/useGameData";
  import type {
    CreateGameDataReq,
    GetGameDataReq,
    GetGameDataRes,
  } from "@src/../../clicker-game-shared/ts/api/gameData";
  import type { RequestRes } from "@api/hooks/useRequest";

  const rpmReductionDelay = 1000;
  const rpmReductionRate = 0.5;

  $: $isRunning = $rpm > 0;
  $: $GearIcon = _GearIcon;
  $: tweenedRpm.set($rpm, { duration: rpmReductionDelay });
  $: tweenedMoney.set($money, { duration: moneyEarnedInterval });

  useRpmReduction(rpm, rpmReductionRate, rpmReductionDelay);
  useMoneyEarned(rpm, money, moneyEarned);

  const { isAccelerating } = useIsAccelerating(rpm);

  const {
    session,
    getIsLoading: sessionIsLoading,
    getError: sessionError,

    createIsLoading: createSessionIsLoading,
    createError: createSessionError,
    create: createSession,
  } = useSession();

  const {
    gameData,
    getIsLoading: gameDataIsLoading,
    getError: gameDataError,

    createIsLoading: createGameDataIsLoading,
    createError: createGameDataError,
  } = useGameData(session);

  $: console.log({ $session, $gameData });

  setContext("global", {
    ...defaultGlobalContext,

    isAccelerating,

    session,
    sessionIsLoading,
    sessionError,

    createSessionIsLoading,
    createSessionError,
    createSession,

    gameData,
    gameDataIsLoading,
    gameDataError,

    createGameDataIsLoading,
    createGameDataError,
  });
</script>

<slot />
