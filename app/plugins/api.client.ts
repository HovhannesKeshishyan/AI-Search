import Swal from "sweetalert2";

export default defineNuxtPlugin((_nuxtApp) => {
  const apiFetch = $fetch.create({
    async onResponseError({ response }) {
      console.log("API Interceptor Error");
      console.error(response);

      if (response.status === 401) {
        await navigateTo("/login");
      } else if (response.status === 403) {
        showError({
          statusCode: 403,
          statusMessage:
            "Forbidden: You do not have permission to view this resource.",
          fatal: true,
        });
      } else if (response.status >= 500) {
        Swal.fire({
          title: "Error!",
          text: "Something whent wrong..",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
  });

  return {
    provide: {
      api: apiFetch,
    },
  };
});
