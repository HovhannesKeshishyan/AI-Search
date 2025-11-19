<script setup lang="ts">
definePageMeta({
  middleware: ["guest"],
});

const user = useAuthUser();
const username = ref("");
const password = ref("");
const errorMsg = ref<string | null>(null);

async function handleLogin() {
  errorMsg.value = null;
  try {
    const userData = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        username: username.value,
        password: password.value,
      },
    });

    // Update the state
    user.value = userData;

    // Redirect to a protected page or home
    await navigateTo("/");
  } catch (error: unknown) {
    if (error instanceof Error && "data" in error) {
      const data = error.data as { statusMessage: string };
      errorMsg.value = data.statusMessage || "An error occurred.";
    } else {
      errorMsg.value = "An error occurred.";
    }
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="title">Login</h1>

      <form class="form" @submit.prevent="handleLogin">
        <div class="field">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            autocomplete="username"
            required
          >
        </div>

        <div class="field">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
          >
        </div>

        <button class="btn" type="submit">Log in</button>

        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f6fa;
  color: #000;
  padding: pxToRem(20px);
}

.login-card {
  width: 100%;
  max-width: pxToRem(380px);
  background: #fff;
  padding: pxToRem(32px);
  border-radius: pxToRem(12px);
  box-shadow: 0 pxToRem(6px) pxToRem(18px) rgba(0, 0, 0, 0.08);
}

.title {
  margin-bottom: pxToRem(24px);
  text-align: center;
  font-weight: 600;
  font-size: pxToRem(24px);
}

.form {
  display: flex;
  flex-direction: column;
  gap: pxToRem(16px);
}

.field {
  display: flex;
  flex-direction: column;
  gap: pxToRem(6px);
}

label {
  font-size: pxToRem(16px);
  font-weight: 500;
}

input {
  padding: pxToRem(10px) pxToRem(12px);
  border-radius: pxToRem(8px);
  border: 1px solid #ccc;
  font-size: pxToRem(16px);
  transition: border-color 0.25s;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
}

.btn {
  margin-top: pxToRem(8px);
  padding: pxToRem(10px);
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: pxToRem(8px);
  font-size: pxToRem(15px);
  cursor: pointer;
  transition: background-color 0.25s;
}

.btn:hover {
  background: #2563eb;
}

.error {
  color: #e11d48;
  font-size: pxToRem(14px);
  margin-top: pxToRem(6px);
}
</style>
