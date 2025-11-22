import bcrypt from "bcrypt";

function throwAuthError() {
  throw createError({
    statusCode: 401,
    statusMessage: "Invalid credentials",
  });
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{ username: string; password: string }>(event);

    const user = await getAdminCredentialsFromDB();

    if (!user || user.username !== body.username) {
      return throwAuthError();
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password);

    if (!passwordMatch) {
      return throwAuthError();
    }

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
    console.log(error);
    return throwAuthError();
  }
});
