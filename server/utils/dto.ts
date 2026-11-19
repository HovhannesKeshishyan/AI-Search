export const getProductDTO = (product: Product): ProductDTO => {
  const { id, title, description, price, imageUrl, imagePublicID } = product;
  return {
    id,
    title,
    description,
    price,
    imageUrl,
    imagePublicID,
    hasEmbeddings: !!product.embeddings?.length,
  };
};
