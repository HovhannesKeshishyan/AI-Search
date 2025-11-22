export default defineEventHandler(async (event) => {
  const body = await readBody<{ product: ProductFormState }>(event);
  const product = body?.product;

  const products = await getProductsFromDB();

  const { secureUrl } = await uploadeImageToCloud(product.imageUrl);
  product.imageUrl = secureUrl;

  const finalProduct = {
    ...product,
    id: crypto.randomUUID(),
    embeddings: await generateEmbedding(product.title.toLowerCase()),
  };

  products.push(finalProduct);

  await addProductsToDB(products);

  return getProductDTO(finalProduct);
});
