<template>
  <div class="default-layout">
    <AppHeader/>
    <main>
      <slot />
    </main>
    <AppFooter/>
  </div>
</template>

<style scoped>
.default-layout {
  display: flex;
  min-height: 100dvh;
  flex-direction: column;
  max-width: 1240px;
  margin: 0 auto;

  main {
    flex: 1;
  }
}
</style>