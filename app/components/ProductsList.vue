<script lang="ts" setup>
defineProps<{ products: Product[] }>();
</script>

<template>
  <div class="products-list">
    <NuxtLink
      v-for="product in products"
      :key="product.id"
      :to="`/product/${product.id}`"
      class="product-item"
      :data-has-embeddings="!!product.embeddings?.length"
    >
      <ProductCard :product="product" />
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/css/breackpoints.scss";

.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: pxToRem(30px) pxToRem(16px);
  padding: pxToRem(20px) 0;

  @media screen and (max-width: breackpoints.$mobile) {
    grid-template-columns: 1fr;
  }

  a {
    text-decoration: none;
  }
}
</style>
