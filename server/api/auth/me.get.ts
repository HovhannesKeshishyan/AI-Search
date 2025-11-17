// This is a protected route, it relies on the auth middleware
export default defineEventHandler(async (event) => {
  // event.context.user is populated by our server middleware
  if (event.context.user) {
    return {
      user: event.context.user
    };
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
});