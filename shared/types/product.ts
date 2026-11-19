export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  imagePublicID: string;
  embeddings: number[] | null;
}

export type ProductDTO = Omit<Product, "embeddings"> & {
  hasEmbeddings: boolean;
};
