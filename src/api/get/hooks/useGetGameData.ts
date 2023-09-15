import useRequest from "@api/hooks/useRequest";
import getGameData from "../getGameData";

export default <F = undefined>(defaultValue?: F) => useRequest(getGameData, defaultValue);
