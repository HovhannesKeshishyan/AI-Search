<script setup lang="ts">
import Message from "primevue/message";
import { refDebounced } from "@vueuse/core";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";

const search = ref("");
const debouncedSearch = refDebounced(search, 200);
const enableSemanticSearch = ref(false);

const { data } = await useFetch(
  () =>
    `/api/products?search=${debouncedSearch.value}&enableSemanticSearch=${enableSemanticSearch.value}`
);

const isEmpty = computed(() => !data.value?.products.length);
</script>

<template>
<div>
  <section class="search-section">
    <div class="search-input-wrapper">
      <label for="search">Search</label>
      <InputText id="search" v-model="search" type="search" placeholder="Search" />
    </div>

    <div class="semantic-search-wrapper">
      <label for="semantic">Enable Semantic Search</label>
      <Checkbox v-model="enableSemanticSearch" input-id="semantic" :binary="true" />
    </div>
  </section>

  <section class="products-section">
    <Message v-if="isEmpty" severity="warn">Products list is empty</Message>
    <ProductsList v-else :products="data?.products || []" />
  </section>
</div>
</template>

<style scoped lang="scss">
.search-section {
  display: flex;
  flex-direction: column;
  gap: pxToRem(12px);
  margin-top: pxToRem(20px);

  label {
    font-size: pxToRem(20px);
  }

  input#search {
    width: 100%;
  }

  .search-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: pxToRem(4px);
  }

  .semantic-search-wrapper {
    display: flex;
    align-items: center;
    gap: pxToRem(6px);
  }
}

.products-section {
  margin-top: pxToRem(20px);
}
</style>
