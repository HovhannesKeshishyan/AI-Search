<template>
  <div class="default-layout">
    <AppHeader />
    <main class="container">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  display: flex;
  min-height: 100dvh;
  flex-direction: column;

  main {
    flex: 1;
  }
}
</style>
