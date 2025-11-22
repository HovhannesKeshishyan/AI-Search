<script lang="ts" setup>
import { toast } from "vue3-toastify";
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
    image: props.product.image,
  };
}

const imageIsChanged = ref(false);

function onImageChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0] as File;
    const reader = new FileReader();

    reader.onload = async (e) => {
      const result = e.target?.result || null;
      formState.value.image = String(result);
      imageIsChanged.value = true;
    };

    reader.readAsDataURL(file);
  } else {
    formState.value.image = "";
  }
}

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
          v-model="formState.image"
          name="image"
          type="text"
          placeholder="Image"
        />
      </div>
      <div class="form-input">
        <label for="new-image">
          {{ formState.image ? "Change Image" : "Select Image" }}
        </label>
        <InputText
          id="new-image"
          name="file"
          type="file"
          @change="onImageChange"
        />

        <NuxtImg
          v-if="formState.image"
          class="img-tmb"
          :src="formState.image"
          alt="Image tumbnail"
        />

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
