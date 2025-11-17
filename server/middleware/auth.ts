import type { H3Event } from "h3";
import { cleareAuthToken } from "../utils/cleareAuthToken";

const isAdminRoute = (event: H3Event) => {
  const { path, method } = event;
  return (
    path.startsWith("/api/products") &&
    ["POST", "PUT", "DELETE"].includes(method)
  );
};

export default defineEventHandler(async (event) => {
  let isAdmin = false;

  // Get the token from the cookie
  const token = getCookie(event, "auth_token");

  if (token) {
    try {
      const payload = await verifyJwtToken(token);

      const user = await myUserDatabase.findById(payload.id);

      if (user) {
        event.context.user = {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        };
      } else {
        event.context.user = null;
      }
    } catch (error) {
      console.log(error);
      event.context.user = null;
      cleareAuthToken(event);
    }

    isAdmin = event.context.user?.role === "ADMIN";
  }

  if (isAdminRoute(event) && !isAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: "You shall not pass",
    });
  }
});
