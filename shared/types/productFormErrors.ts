import type { ProductFormState } from "./productFormState";

export type ProductFormErrors = Record<keyof ProductFormState, string>;
