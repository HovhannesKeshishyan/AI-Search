import type { H3Event } from "h3";

const ONE_WEEK = 60 * 60 * 24 * 7;

export const setAuthToken = (
  event: H3Event,
  token: string,
  maxAge = ONE_WEEK
) => {
  setCookie(event, "auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: maxAge,
    path: "/",
  });
};
