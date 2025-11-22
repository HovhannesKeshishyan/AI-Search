export default defineEventHandler(async (event) => {
  const body = await readBody<{ product: ProductFormState }>(event);
  const product = body?.product;

  const products = await getProductsFromDB();

  const { publicId, secureUrl } = await uploadeImageToCloud(product.imageUrl);

  const finalProduct: Product = {
    ...product,
    id: crypto.randomUUID(),
    imageUrl: secureUrl,
    imagePublicID: publicId,
    embeddings: await generateEmbedding(product.title.toLowerCase()),
  };

  products.push(finalProduct);

  await addProductsToDB(products);

  return getProductDTO(finalProduct);
});
