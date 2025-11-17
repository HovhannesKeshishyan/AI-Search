<script setup lang="ts">
definePageMeta({
  middleware: ["guest"],
});

const user = useAuthUser();
const email = ref("");
const password = ref("");
const errorMsg = ref<string | null>(null);

async function handleLogin() {
  errorMsg.value = null;
  try {
    const userData = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        email: email.value,
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
    errorMsg.value = "An error occurred.";
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="title">Login</h1>

      <form class="form" @submit.prevent="handleLogin">
        <div class="field">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
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

      <p class="hint">Hint: admin@example.com (admin) or user@example.com (user)</p>
    </div>
  </div>
</template>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f6fa;
  color: #000;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 380px;
  background: #fff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
}

.title {
  margin-bottom: 24px;
  text-align: center;
  font-weight: 600;
  font-size: 24px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 14px;
  font-weight: 500;
}

input {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  transition: border-color 0.25s;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
}

.btn {
  margin-top: 8px;
  padding: 10px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.25s;
}

.btn:hover {
  background: #2563eb;
}

.error {
  color: #e11d48;
  font-size: 14px;
  margin-top: 6px;
}

.hint {
  margin-top: 16px;
  text-align: center;
  font-size: 13px;
  color: #777;
}
</style>