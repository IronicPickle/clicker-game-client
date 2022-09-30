import createSession from "../createSession";
import useRequest from "@api/hooks/useRequest";

export default <F = undefined>(defaultValue?: F) => useRequest(createSession, defaultValue);
