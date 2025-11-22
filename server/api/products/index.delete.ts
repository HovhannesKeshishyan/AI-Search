export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = body?.id;

  if (!id) {
    throw createError({
      statusCode: 404,
      statusMessage: "Id is required",
    });
  }

  const products = await getProductsFromDB();

  const deletingProductIndex = products.findIndex((p) => p.id === id);

  if (deletingProductIndex === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  const deletedProduct = products.splice(deletingProductIndex, 1);

  // if image of product don't have any other usage, delete it from cloud
  const publicId = deletedProduct[0].imagePublicID;
  const imageHasOtherUsage = products.find((p) => {
    return p.id !== id && p.imagePublicID === publicId;
  });
  if (!imageHasOtherUsage) {
    await deleteImageFromCloud(publicId);
  }

  await addProductsToDB(products);
  return deletedProduct;
});
