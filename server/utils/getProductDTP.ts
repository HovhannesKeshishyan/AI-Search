export const getProductDTO = (product: Product) => {
  const { id, title, description, price, image } = product;
  return {
    id,
    title,
    description,
    price,
    image,
    hasEmbedings: product.embeddings?.length,
  };
};
