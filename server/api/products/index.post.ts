export default defineEventHandler(async (event) => {
  const body = await readBody<{product: ProductFormState;}>(event);
  const product = body?.product;

  const products = await getProductsFromDB(event);

  const finalProduct = {
    ...product,
    id: crypto.randomUUID(),
    embeddings: [] //todo
  }

  products.push(finalProduct);

  await addProductsToDB(event, products);

  return finalProduct;
});
