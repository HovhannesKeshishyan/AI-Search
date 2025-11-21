export default defineNuxtPlugin(async (nuxtApp) => {
  const user = useAuthUser();

  // On server, initialize state from context
  if (import.meta.server) {
    const event = nuxtApp.ssrContext?.event;
    if (event) {
      user.value = event.context.user;
    }
  }

  // Helper function for client-side logout
  const logout = async () => {
    user.value = null;
    await navigateTo("/login");
  };

  return {
    provide: {
      auth: {
        user,
        logout,
      },
    },
  };
});
