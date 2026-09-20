export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  imagePublicID: string;
  embeddings: number[] | null;
}
