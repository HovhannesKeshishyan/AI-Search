export default defineEventHandler(async (event) => {
  cleareAuthToken(event);

  return { message: "Logged out" };
});
