import type { H3Event } from "h3";
import { setAuthToken } from "./setAuthToken";

export const cleareAuthToken = (event: H3Event) => {
  setAuthToken(event, "", 0);
};
