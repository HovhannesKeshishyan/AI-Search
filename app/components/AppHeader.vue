<script setup lang="ts">
const user = useAuthUser();
const { $auth } = useNuxtApp();

async function handleLogout() {
  await $fetch("/api/auth/logout", { method: "POST" });
  await $auth.logout();
}
</script>

<template>
<header>
  <nav>
    <div class="logo">
      <NuxtLink to="/">
        <NuxtImg src="/logo.png"/>
      </NuxtLink>
    </div>
    <div v-if="user" class="admin-section">
      <span>Welcome, {{ user.name }} ({{ user.role }})</span>

      
      <NuxtLink to="/product/add">
         <Button label="Add Product"/>
      </NuxtLink>

      <Button severity="danger" label="Logout" @click="handleLogout"/>
    </div>
    <div v-else>
      <NuxtLink to="/login">
         <Button label="Login"/>
      </NuxtLink>
    </div>
  </nav>
</header>
</template>

<style scoped lang="scss">
header {
  padding: pxToRem(20px);
  border-bottom: 1px solid #ccc;

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: pxToRem(20px);
    justify-content: space-between;
    align-items: center;
  }
}

.logo img {
  height: pxToRem(50px);
}

.admin-section {
  display: flex;
  gap: pxToRem(10px);
  align-items: center;
}
</style>
