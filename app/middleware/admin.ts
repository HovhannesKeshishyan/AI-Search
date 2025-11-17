export default defineNuxtRouteMiddleware((_to, _from) => {
  const user = useAuthUser();
  
  if (!user.value || user.value.role !== "ADMIN") {
    return navigateTo("/login");
  }
});