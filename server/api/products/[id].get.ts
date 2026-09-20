export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "id is required",
    });
  }

  const products = await getProductsFromDB();

  const product = products.find((p) => p.id === id);
  if (product) return getProductDTO(product);

  throw createError({
    statusCode: 404,
    statusMessage: "Product not found",
  });
});
