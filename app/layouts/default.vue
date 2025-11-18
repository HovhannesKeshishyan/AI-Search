<template>
  <div class="default-layout">
    <AppHeader />
    <main>
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
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 pxToRem(48px);

  main {
    flex: 1;
  }

  @media screen and (max-width: 480px) {
    padding: 0 pxToRem(20px);
  }
}
</style>
