import jwt, { type JwtPayload } from "jsonwebtoken";

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
