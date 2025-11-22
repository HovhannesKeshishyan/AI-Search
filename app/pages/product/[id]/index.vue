<script lang="ts" setup>
import { toast } from "vue3-toastify";
const router = useRouter();
const route = useRoute();

const id = route.params.id;

const user = useAuthUser();

const isDeleting = ref(false);

const { data: product } = await useFetch<Product>(`/api/products/${id}`);

const metaTags = computed(() => {
  return {
    title: product?.value?.title,
    description: product?.value?.description,
  };
});

useSeoMeta({
  title: metaTags.value.title,
  description: metaTags.value.description,
});

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
    await navigateTo("/", { replace: true });
    toast("Product deleted.");
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

    <div class="product-info">
      <h1 class="info-block title">
        <i>Title:</i>
        {{ product.title }}
      </h1>
      <p class="info-block price">
        <i>Price:</i>
        ${{ Number(product.price).toFixed(2) }}
      </p>
      <p class="info-block description">
        <i>Description:</i>
        {{ product.description }}
      </p>

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
@use "~/assets/css/breackpoints.scss";
@use "~/assets/css/colors.scss";

.product-page {
  display: flex;
  gap: pxToRem(16px);
  padding: pxToRem(16px) 0;
}

.image-wrapper {
  position: relative;
  border-radius: pxToRem(15px);
  overflow: hidden;
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

.product-info {
  display: flex;
  flex-direction: column;
  width: 50%;
  color: white;
  gap: pxToRem(10px);
}

.info-block {
  display: flex;
  flex-wrap: wrap;
  gap: pxToRem(10px);
}

.price {
  font-size: pxToRem(30px);
  color: colors.$primary;
}

.description {
  font-size: pxToRem(20px);
}

.buttons-wrapper {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: pxToRem(20px);
}

@media screen and (max-width: breackpoints.$tablet) {
  .product-page {
    flex-direction: column;

    .image-wrapper,
    .product-info {
      width: 100%;
    }

    .buttons-wrapper {
      margin-top: pxToRem(30px);
    }
  }
}
</style>
