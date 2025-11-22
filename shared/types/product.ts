export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  imagePublicID: string;
  embeddings: number[] | null;
}
