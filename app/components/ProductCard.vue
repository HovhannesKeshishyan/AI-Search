<script lang="ts" setup>
defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="product-card">
    <div class="image-wrapper">
      <NuxtImg
        :src="product.image"
        width="300"
        height="200"
        quality="80"
        fit="cover"
        :alt="product.title"
      />
    </div>

    <div class="product-card-body">
      <h2 class="product-title">{{ product.title }}</h2>

      <h3 class="product-description">{{ product.description }}</h3>

      <div class="product-price">${{ Number(product.price).toFixed(2) }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/css/colors.scss";

.product-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 8px 1px colors.$primary;
  border-radius: pxToRem(20px);
  overflow: hidden;
  transition: scale 0.2s ease-in-out;

  @media (hover: hover) {
    &:hover {
      scale: 1.02;
    }
  }
}

.image-wrapper {
  border-radius: pxToRem(10px) pxToRem(10px) 0 0;
  height: pxToRem(200px);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.product-card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: pxToRem(5px);
  padding: pxToRem(10px) pxToRem(15px);
}

.product-title {
  color: white;
  font-size: pxToRem(24px);
  line-height: pxToRem(28px);
}

.product-description {
  font-size: pxToRem(20px);
  color: colors.$text-secondary;
}

.product-price {
  margin-top: auto;
  font-size: pxToRem(24px);
  color: colors.$primary;
}
</style>
