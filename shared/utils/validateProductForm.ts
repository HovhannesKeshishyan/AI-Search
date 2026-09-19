import type { ProductFormErrors } from "../types/productFormErrors";
import type { ProductFormState } from "../types/productFormState";

export const validateProductForm = (
  formState: ProductFormState
): { isValid: boolean; errors: ProductFormErrors } => {
  const errors = {} as ProductFormErrors;

  if (!formState.title?.trim()) {
    errors.title = "Title is required.";
  }
  if (!formState.description?.trim()) {
    errors.description = "Description is required.";
  }
  const price = String(formState.price ?? "").trim();
  if (!price) {
    errors.price = "Price is required.";
  } else if (!Number.isInteger(Number(price))) {
    errors.price = "Price must be an integer.";
  }
  if (!formState.imageUrl?.trim()) {
    errors.imageUrl = "Image is required.";
  }

  const isValid = !Object.keys(errors).length;

  return { isValid, errors };
};
