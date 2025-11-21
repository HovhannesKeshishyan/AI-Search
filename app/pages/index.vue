<script setup lang="ts">
import ProgressSpinner from "primevue/progressspinner";
import Message from "primevue/message";
import { refDebounced } from "@vueuse/core";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";

const SEMANTIC_SEARCH_DESCRIPTION =
  "Semantic search is an advanced search technique that understands the context and intent behind a user's query, rather than just matching keywords.";

const search = ref("");
const debouncedSearch = refDebounced(search, 200);
const enableSemanticSearch = ref(false);

const { data, status } = await useFetch(
  () =>
    `/api/products?search=${debouncedSearch.value}&enableSemanticSearch=${enableSemanticSearch.value}`
);

const isEmpty = computed(() => !data.value?.products.length);
</script>

<template>
  <div class="home-page">
    <section class="search-section">
      <div class="search-input-wrapper">
        <label for="search">Search</label>
        <InputText
          id="search"
          v-model="search"
          type="search"
          placeholder="Search"
        />
      </div>

      <div class="semantic-search-wrapper">
        <label for="semantic">Enable Semantic Search</label>
        <Checkbox
          v-model="enableSemanticSearch"
          input-id="semantic"
          :binary="true"
        />
        <i
          v-tooltip.focus="SEMANTIC_SEARCH_DESCRIPTION"
          tabindex="0"
          class="pi pi-info-circle"
        />
      </div>
    </section>

    <section class="products-section">
      <div v-if="status === 'pending'" class="progress-spinner-container">
        <ProgressSpinner />
      </div>
      <div
        :class="`products-list-container ${
          status === 'pending' ? 'loading' : ''
        }`"
      >
        <Message v-if="isEmpty" severity="warn">Products list is empty</Message>
        <ProductsList v-else :products="data?.products || []" />
      </div>
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

    i {
      font-size: pxToRem(20px);
    }
  }
}

.products-section {
  position: relative;
  margin-top: pxToRem(20px);
}

.progress-spinner-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  z-index: 9999;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.products-list-container {
  &.loading {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
