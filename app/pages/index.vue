<script setup lang="ts">
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
</script>

<template>
  <div>
    <h1>Browse Products</h1>

    <section class="search-section">
      <div class="search-input-wrapper">
        <label for="search">Search</label>
        <InputText id="search" v-model="search" type="search" placeholder="Search" />
      </div>

      <div class="semantic-search-wrapper">
        <label for="semantic">Enable Semantic Search</label>
        <Checkbox
          v-model="enableSemanticSearch"
          input-id="semantic"
          :binary="true"
        />
      </div>
    </section>

    <section>
      <ProductsList :products="data?.products || []" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.search-section {
  display: flex;
  flex-direction: column;
  gap: pxToRem(12px);
  padding: pxToRem(12px);

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
</style>
