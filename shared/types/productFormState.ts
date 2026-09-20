import type { Product } from "./product";

// price stays a string here: it's the raw text-input value before it's
// parsed into Product's numeric price at the API boundary.
export type ProductFormState = Omit<
  Product,
  "id" | "embeddings" | "imagePublicID" | "price"
> & {
  price: string;
};
