import bcrypt from "bcrypt";

function throwAuthError() {
  throw createError({
    statusCode: 401,
    statusMessage: "Invalid credentials",
  });
}

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) || "unknown";

  const attempts = await getLoginAttempts(ip);
  if (attempts >= LOGIN_RATE_LIMIT.maxAttempts) {
    throw createError({
      statusCode: 429,
      statusMessage: "Too many login attempts. Please try again later.",
    });
  }

  try {
    const body = await readBody<{ username: string; password: string }>(event);

    const user = await getAdminCredentialsFromDB();

    if (!user || user.username !== body.username) {
      await registerFailedLoginAttempt(ip);
      return throwAuthError();
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password);

    if (!passwordMatch) {
      await registerFailedLoginAttempt(ip);
      return throwAuthError();
    }

    await clearLoginAttempts(ip);

    const { id, role, username, name } = user;
    const userToken = createJwtToken({ id, role, name, username });

    setAuthToken(event, userToken);

    const userDto: Omit<User, "password"> = {
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
    };
    return userDto;
  } catch (error) {
    logger.error("Login request failed", error);
    return throwAuthError();
  }
});
