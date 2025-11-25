<script setup lang="ts">
const user = useAuthUser();
const { $auth } = useNuxtApp();

async function handleLogout() {
  await $fetch("/api/auth/logout", { method: "POST" });
  await $auth.logout();
}
</script>

<template>
  <div class="container header-container">
    <header class="header">
      <nav class="nav">
        <div class="app-title">
          <NuxtLink to="/">
            <h1>Semantic Search</h1>
          </NuxtLink>
        </div>
        <div v-if="user" class="admin-section">
          <span>Welcome, {{ user.name }} ({{ user.role }})</span>

          <div class="buttons-wrapper">
            <Button v-slot="slotProps" as-child>
              <NuxtLink to="/product/add" :class="slotProps.class"
                >Add Product</NuxtLink
              >
            </Button>

            <Button severity="danger" label="Logout" @click="handleLogout" />
          </div>
        </div>
        <div v-else>
          <Button v-slot="slotProps" as-child>
            <NuxtLink to="/login" :class="slotProps.class">Login</NuxtLink>
          </Button>
        </div>
      </nav>
    </header>
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/css/colors.scss";

.header-container {
  position: sticky;
  top: 0;
  z-index: 9000;
  background-color: colors.$bg-dark;
}

.header {
  padding: pxToRem(20px) 0;
  border-bottom: 1px solid white;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: pxToRem(20px);
  justify-content: space-between;
  align-items: center;
}

.app-title a {
  text-decoration: none;
  color: white;
}

.admin-section {
  display: flex;
  gap: pxToRem(10px);
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.buttons-wrapper {
  display: flex;
  gap: pxToRem(10px);
  flex-wrap: wrap;

  button {
    white-space: nowrap;
  }
}
</style>
