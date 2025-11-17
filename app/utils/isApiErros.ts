import type { ProductFormErrors } from "~~/shared/types/productFormErrors";

interface ApiError {
  data: {
    data: ProductFormErrors;
  };
}

export const isApiError = (error: unknown): error is ApiError => {
  if (!(error instanceof Error)) return false;

  if (!("data" in error) || !error.data || typeof error.data !== "object")
    return false;

  const mainData = error.data;

  if (
    !("data" in mainData) ||
    !mainData.data ||
    typeof mainData.data !== "object"
  )
    return false;

  return true;
};
