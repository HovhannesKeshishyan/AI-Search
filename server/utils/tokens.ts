import type { H3Event } from "h3";
import jwt, { type JwtPayload } from "jsonwebtoken";

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

export const cleareAuthToken = (event: H3Event) => {
  setAuthToken(event, "", 0);
};

export const createJwtToken = (payload: object) => {
  return jwt.sign(payload, String(process.env.JWT_ACCESS_SECRET), {
    expiresIn: "1h",
  });
};

export const verifyJwtToken = async (token: string): Promise<JwtPayload> => {
  try {
    return jwt.verify(
      token,
      String(process.env.JWT_ACCESS_SECRET)
    ) as JwtPayload;
  } catch (error) {
    console.log(error);
    throw new Error("Invalid token");
  }
};
