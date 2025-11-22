<script lang="ts" setup>
import { toast } from "vue3-toastify";
import { useFileDialog } from "@vueuse/core";
import type { ProductFormErrors } from "~~/shared/types/productFormErrors";

const props = defineProps<{
  product?: Product;
}>();

const { $api } = useNuxtApp();

const id = props.product?.id || null;

let initialState = {} as ProductFormState;
if (props.product) {
  initialState = {
    title: props.product.title,
    description: props.product.description,
    price: props.product.price,
    imageUrl: props.product.imageUrl,
  };
}

const imageIsChanged = ref(false);

const { open, onChange } = useFileDialog();

onChange((files) => {
  if (files?.[0]) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result || null;
      formState.value.imageUrl = String(result);
      imageIsChanged.value = true;
    };
    reader.readAsDataURL(files[0]);
  } else {
    formState.value.imageUrl = "";
  }
});

const isSubmiting = ref(false);
const formErrors = ref<ProductFormErrors>({} as ProductFormErrors);
const formState = ref<ProductFormState>(initialState);

const onFormSubmit = async () => {
  const values = formState.value;
  const { isValid, errors } = validateProductForm(values);
  if (!isValid) {
    formErrors.value = errors;
    return;
  }

  isSubmiting.value = true;

  try {
    const payload = {
      id: id || null,
      imageIsChanged: imageIsChanged.value,
      product: values,
    };
    // edit mode
    const method = id ? "PUT" : "POST";
    await $api("/api/products", {
      method: method,
      body: payload,
    });
    await navigateTo("/");
    toast("Form submited.");
  } catch (error: unknown) {
    if (isApiError(error)) {
      formErrors.value = error.data.data;
    } else {
      console.log(error);
    }
    toast.error("Failed to submit form.");
  }

  isSubmiting.value = false;
};
</script>

<template>
  <div class="product-form">
    <h1>{{ id ? "Edit Product" : "Add Product" }}</h1>

    <Form :initial-values="formState" class="form" @submit="onFormSubmit">
      <div class="form-input">
        <InputText
          v-model="formState.title"
          name="title"
          type="text"
          placeholder="Title"
          fluid
        />
        <Message
          v-if="formErrors.title"
          severity="error"
          size="small"
          variant="simple"
          >{{ formErrors.title }}</Message
        >
      </div>
      <div class="form-input">
        <InputText
          v-model="formState.description"
          name="description"
          type="text"
          placeholder="Description"
          fluid
          :form-control="{ validateOnValueUpdate: true }"
        />
        <Message
          v-if="formErrors.description"
          severity="error"
          size="small"
          variant="simple"
          >{{ formErrors.description }}</Message
        >
      </div>
      <div class="form-input">
        <InputText
          v-model="formState.price"
          name="price"
          type="number"
          placeholder="Price"
          fluid
        />
        <Message
          v-if="formErrors.price"
          severity="error"
          size="small"
          variant="simple"
          >{{ formErrors.price }}</Message
        >
      </div>
      <div class="display-none">
        <InputText
          v-model="formState.imageUrl"
          name="image"
          type="text"
          placeholder="Image"
        />
      </div>
      <div class="form-input">
        <Button
          type="button"
          :label="formState.imageUrl ? 'Change Image' : 'Select Image'"
          @click="() => open()"
        />

        <NuxtImg
          v-if="formState.imageUrl"
          class="img-tmb"
          :src="formState.imageUrl"
          alt="Image tumbnail"
        />

        <Message
          v-if="formErrors.imageUrl"
          severity="error"
          size="small"
          variant="simple"
          >{{ formErrors.imageUrl }}</Message
        >
      </div>

      <Button
        :disabled="isSubmiting"
        :loading="isSubmiting"
        type="submit"
        severity="success"
        label="Submit"
      />
    </Form>
  </div>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: pxToRem(40px);
}

.form-input {
  display: flex;
  flex-direction: column;
  gap: pxToRem(10px);
}

.img-tmb {
  max-width: pxToRem(200px);
  height: auto;
  border-radius: pxToRem(20px);
}
</style>
