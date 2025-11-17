<script setup lang="ts">
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";

const search = ref("");
const enableSemanticSearch = ref(false);

const {data} = await useFetch(() =>`/api/products?search=${search.value}`);
</script>

<template>
<div>
  <h1>Browse Products</h1>

  <section class="search-section">

    <div class="search-input-wrapper">
      <label for="search">Search</label>
      <InputText id="search" v-model="search" placeholder="Search" />
    </div>

    <div class="semantic-search-wrapper">
      <label for="semantic">Enable Semantic Search</label>
      <Checkbox v-model="enableSemanticSearch" input-id="semantic" :binary="true" />
    </div>
  </section>

  <section>
    <ProductsList :products="data?.products || []"/>
  </section>
</div>
</template>

<style scoped lang="scss">
.search-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;

  input#search {
    width: 100%;
  }

  .search-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .semantic-search-wrapper {
    display: flex;
    align-items: center;
    gap: 6px;
  }
}
</style>