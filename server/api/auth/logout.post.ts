import { cleareAuthToken } from "~~/server/utils/cleareAuthToken";

export default defineEventHandler(async (event) => {
  cleareAuthToken(event);

  return { message: "Logged out" };
});