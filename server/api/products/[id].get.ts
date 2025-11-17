export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 404,
      statusMessage: "id is required",
    });
  }
  
  const products = await getProductsFromDB(event);

  const product = products.find((p) => p.id === id);
  if (product) return product;

  throw createError({
    statusCode: 404,
    statusMessage: "Product not found",
  });
});
