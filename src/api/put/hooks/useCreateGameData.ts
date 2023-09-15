import useRequest from "@api/hooks/useRequest";
import createGameData from "../createGameData";

export default <F = undefined>(defaultValue?: F) => useRequest(createGameData, defaultValue);
