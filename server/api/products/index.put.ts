export default defineEventHandler(async (event) => {
  const {
    id,
    imageIsChanged,
    product: editedProduct,
  } = await readBody<{
    id: string;
    imageIsChanged: boolean;
    product: ProductFormState;
  }>(event);

  const products = await getProductsFromDB();

  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  // keep current image data
  let imageUrl = products[productIndex].imageUrl;
  let imagePublicID = products[productIndex].imagePublicID;

  if (imageIsChanged) {
    // if old image of product don't have any other usage, delete it from cloud
    const imageHasOtherUsage = products.find((p) => {
      return p.id !== id && p.imagePublicID === imagePublicID;
    });
    // upload new image and delete old
    const [{ publicId, secureUrl }] = await Promise.all([
      uploadeImageToCloud(editedProduct.imageUrl),
      imageHasOtherUsage ? null : deleteImageFromCloud(imagePublicID),
    ]);
    // set image new data
    imageUrl = secureUrl;
    imagePublicID = publicId;
  }

  const isTitleChanged = editedProduct.title !== products[productIndex].title;
  const embeddings = isTitleChanged
    ? await generateEmbedding(editedProduct.title.toLowerCase())
    : products[productIndex].embeddings;

  const updatedProduct: Product = {
    ...editedProduct,
    id, // id comes as seperate key, to not include in validation
    imageUrl,
    imagePublicID,
    embeddings: embeddings,
  };

  // maybe can skip this
  products[productIndex] = updatedProduct;

  await addProductsToDB(products);

  return getProductDTO(products[productIndex]);
});
