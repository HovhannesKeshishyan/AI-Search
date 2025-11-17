import type { Product } from "./product";

export type ProductFormState = Omit<Product, "id" | "embeddings">