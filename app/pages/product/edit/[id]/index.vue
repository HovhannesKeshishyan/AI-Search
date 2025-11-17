<script lang="ts" setup>
definePageMeta({
  middleware: ["admin"]
});

const route = useRoute();
const id = route.params.id;

const { data: product } = await useFetch<Product>(`/api/products/${id}`);
</script>

<template>
  <ProductForm :product="product"/>
</template>

<style lang="scss" scoped>

</style>