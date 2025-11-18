<script lang="ts" setup>
import { toast } from "vue3-toastify";
const router = useRouter();
const route = useRoute();

const id = route.params.id;

const user = useAuthUser();

const isDeleting = ref(false);

const { data: product } = await useFetch<Product>(`/api/products/${id}`);

const navigateToEditPage = () => {
  router.push(`/product/edit/${id}`);
};

const deleteProduct = async () => {
  isDeleting.value = true;
  try {
    await $fetch("/api/products", {
      method: "DELETE",
      body: {
        id,
      },
    });
    toast("Product deleted.");
    router.replace("/");
  } catch (error) {
    console.log(error);
    toast.error("Failed to delete product.");
  }
  isDeleting.value = false;
};
</script>

<template>
  <div v-if="!product">Product not found</div>

  <div v-else class="product-page">
    <div class="image-wrapper">
      <NuxtImg
        :src="product.image"
        width="500"
        height="500"
        quality="80"
        :alt="product.title"
      />
    </div>

    <div class="content-wrapper">
      <h1 class="title">{{ product.title }}</h1>
      <p class="price">${{ Number(product.price).toFixed(2) }}</p>
      <h2 class="description-label">Description</h2>
      <p class="description">{{ product.description }}</p>

      <div v-if="user?.role === 'ADMIN'" class="buttons-wrapper">
        <Button label="Edit" severity="success" @click="navigateToEditPage" />

        <Button
          :disabled="isDeleting"
          :loading="isDeleting"
          label="Delete"
          severity="danger"
          @click="deleteProduct"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-page {
  display: flex;
  background-color: white;
  gap: pxToRem(16px);
  padding: pxToRem(16px);
  border-radius: pxToRem(20px);
}

.image-wrapper {
  position: relative;
  display: flex;
  width: 50%;
  aspect-ratio: 1 / 1;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  width: 50%;
  color: #000;
}

.price {
  color: #008236;
}

.buttons-wrapper {
  display: flex;
  flex-direction: column;
  gap: pxToRem(20px);
}

.edit-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #31ef80;
  padding: pxToRem(15px) pxToRem(20px);
  border-radius: pxToRem(20px);
  font-size: pxToRem(20px);
  color: #000;
  transition: background-color 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    background-color: #03d259;
  }
}
</style>
