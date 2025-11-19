<script lang="ts" setup>
defineProps<{ products: Product[] }>();
</script>

<template>
<div class="products-list">
  <NuxtLink v-for="product in products" :key="product.id" :to="`/product/${product.id}`" class="product-card"
    :data-has-embeddings="!!product.embeddings?.length">
    <Card>
      <template #header>
        <div class="image-wrapper">
          <NuxtImg :src="product.image" width="300" height="200" quality="80" fit="cover" :alt="product.title" />
        </div>
      </template>

      <template #title>
        <h2 class="product-title">{{ product.title }}</h2>
      </template>

      <template #content>
        <h3 class="product-description">{{ product.description }}</h3>
      </template>

      <template #footer>
        <div class="product-price">${{ Number(product.price).toFixed(2) }}</div>
      </template>
    </Card>
  </NuxtLink>
</div>
</template>

<style lang="scss" scoped>
.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: pxToRem(16px);
  padding: pxToRem(20px) 0;
}

.products-list a {
  text-decoration: none;
}

.product-card {
  width: 100%;
}

.image-wrapper {
  border-radius: pxToRem(10px) pxToRem(10px) 0 0;
  overflow: hidden;
  height: pxToRem(200px);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.product-title {
  font-size: pxToRem(34px);
}

.product-description {
  font-size: pxToRem(20px);
}

.product-price {
  font-size: pxToRem(24px);
  color: darkcyan;
}
</style>
