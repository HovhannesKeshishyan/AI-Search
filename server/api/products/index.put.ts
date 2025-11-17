export default defineEventHandler(async (event) => {
  const { id, product: editedProduct } = await readBody<{
    id: string;
    product: ProductFormState;
  }>(event);
  
  const products = await getProductsFromDB(event);

  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }


  
  const updatedProduct: Product = {
    ...editedProduct,
    id, // id comes as seperate key, to not include in validation
    embeddings: products[productIndex].embeddings // not ovveride embeddings
  }

  // maybe can skip this
  products[productIndex] = updatedProduct;

  await addProductsToDB(event, products);

  return products[productIndex];
});
