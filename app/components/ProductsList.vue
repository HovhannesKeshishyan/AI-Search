<script lang="ts" setup>
defineProps<{products: Product[]}>();
</script>

<template>
<div class="products-list">
  <NuxtLink v-for="product in products" :key="product.id" :to="`/product/${product.id}`" class="product-card">
    <Card>
      <template #header>
        <div class="image-wrapper">
          <NuxtImg :src="product.image" width="300" height="200" quality="80" fit="cover" :alt="product.title" />
        </div>
      </template>

      <template #title>
        {{ product.title }}
      </template>

      <template #content>
        <p>{{ product.description }}</p>
      </template>

      <template #footer>
        <div style="font-size: 18px; font-weight: bold;">
          ${{ product.price }}
        </div>
      </template>
    </Card>
  </NuxtLink>
</div>
</template>


<style lang="scss" scoped>
.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  padding: 16px;
}

.product-card {
  width: 100%;
}

.image-wrapper {
  height: 200px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>