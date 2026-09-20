<script lang="ts" setup>
definePageMeta({
  middleware: ["admin"],
});

useSeoMeta({
  title: "Add new product",
});
</script>

<template>
  <ProductForm />
</template>

<style lang="scss" scoped></style>
