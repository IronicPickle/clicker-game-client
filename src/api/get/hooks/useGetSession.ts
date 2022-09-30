import useRequest from "@api/hooks/useRequest";
import getSession from "../getSession";

export default <F = undefined>(defaultValue?: F) => useRequest(getSession, defaultValue);
