export const getProductDTO = (product: Product) => {
  const { id, title, description, price, imageUrl, imagePublicID } = product;
  return {
    id,
    title,
    description,
    price,
    imageUrl,
    imagePublicID,
    hasEmbedings: !!product.embeddings?.length,
  };
};
