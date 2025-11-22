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

  if (imageIsChanged) {
    const { publicId, secureUrl } = await uploadeImageToCloud(
      editedProduct.imageUrl
    );
    editedProduct.imageUrl = secureUrl;
    editedProduct.imagePublicID = publicId;
  }

  const products = await getProductsFromDB();

  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  const isTitleChanged = editedProduct.title !== products[productIndex].title;
  const embeddings = isTitleChanged
    ? await generateEmbedding(editedProduct.title.toLowerCase())
    : products[productIndex].embeddings;
  const updatedProduct: Product = {
    ...editedProduct,
    id, // id comes as seperate key, to not include in validation
    embeddings: embeddings,
  };

  // maybe can skip this
  products[productIndex] = updatedProduct;

  await addProductsToDB(products);

  return getProductDTO(products[productIndex]);
});
