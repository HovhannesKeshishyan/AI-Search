import { setAuthToken } from "~~/server/utils/setAuthToken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await myUserDatabase.findByEmail(body.email);

  if (!user || user.password !== body.password) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }

  const {id, role, email, name} = user; 
  const userToken = createJwtToken({ id, role, name, email });

  setAuthToken(event, userToken);

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name
  };
});