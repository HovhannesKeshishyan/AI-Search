export default defineEventHandler(async (event) => {
  const { search } = getQuery<{ search: string }>(event);
  
  const products = await getProductsFromDB(event);

  if (!search.trim()) {
    return { products: products };
  }

  const searchText = search.toLowerCase();
  const filteredProducts = products.filter((p) => {
    return p.title.toLowerCase().startsWith(searchText);
  });
  return { products: filteredProducts };
});
