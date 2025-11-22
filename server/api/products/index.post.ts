export default defineEventHandler(async (event) => {
  const body = await readBody<{ product: ProductFormState }>(event);
  const product = body?.product;

  const products = await getProductsFromDB();

  const { url } = await uploadeImageToCloud(product.image);
  product.image = url;

  const finalProduct = {
    ...product,
    id: crypto.randomUUID(),
    embeddings: await generateEmbedding(product.title.toLowerCase()),
  };

  products.push(finalProduct);

  await addProductsToDB(products);

  return getProductDTO(finalProduct);
});
