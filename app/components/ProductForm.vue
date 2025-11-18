<script lang="ts" setup>
import { toast } from "vue3-toastify";
import type { FormSubmitEvent } from "@primevue/forms/form";
import type { ProductFormErrors } from "~~/shared/types/productFormErrors";

const props = defineProps<{
  product?: Product;
}>();

const id = props.product?.id || null;

let initialState = {} as ProductFormState;
if (props.product) {
  initialState = {
    title: props.product.title,
    description: props.product.description,
    price: props.product.price,
    image: props.product.image,
  };
}

const isSubmiting = ref(false);
const formErrors = ref<ProductFormErrors>({} as ProductFormErrors);
const formState = ref<ProductFormState>(initialState);

const onFormSubmit = async (e: FormSubmitEvent<Record<string, string>>) => {
  const values = e.values as Record<keyof ProductFormState, string>;
  const { isValid, errors } = validateProductForm(values);
  if (!isValid) {
    formErrors.value = errors;
    return;
  }

  isSubmiting.value = true;

  try {    
    const payload = {
      id: id || null,
      product: e.values
    }
    // edit mode
    const method = id ? "PUT" : "POST";
    await $fetch("/api/products", {
      method: method,
      body: payload,
    });
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

    <Form
      :initial-values="formState"
      class="form"
      @submit="onFormSubmit"
    >
      <div class="form-input">
        <InputText name="title" type="text" placeholder="Title" fluid />
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
        <InputText name="price" type="number" placeholder="Price" fluid />
        <Message
          v-if="formErrors.price"
          severity="error"
          size="small"
          variant="simple"
          >{{ formErrors.price }}</Message
        >
      </div>
      <div class="form-input">
        <InputText name="image" type="text" placeholder="Image" fluid />
        <Message
          v-if="formErrors.image"
          severity="error"
          size="small"
          variant="simple"
          >{{ formErrors.image }}</Message
        >
      </div>
      <Button
        :disabled="isSubmiting"
        :loading="isSubmiting"
        type="submit"
        severity="secondary"
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
</style>
