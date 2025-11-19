import cosineSimilarity from "compute-cosine-similarity";

export default defineEventHandler(async (event) => {
  const { search, enableSemanticSearch } = getQuery<{
    search: string;
    enableSemanticSearch: "true" | "false";
  }>(event);

  const products = await getProductsFromDB(event);

  if (!search.trim()) {
    return { products: products };
  }

  const isSemanticSearch = enableSemanticSearch === "true";

  const semanticSearchValue = isSemanticSearch
    ? await generateEmbedding(search.toLowerCase())
    : null;

  if (semanticSearchValue) {
    // just for testing in browser
    const similarities: { [key: string]: number | null } = {};

    const filteredProducts = products.filter((p) => {
      const title = p.title;
      // when for some reasen embeddings not created
      if (!p.embeddings) {
        similarities[title] = null;
        return false;
      }

      const similarity = cosineSimilarity(p.embeddings, semanticSearchValue);
      similarities[title] = similarity;
      return similarity && similarity > 0.7;
    });

    return { products: filteredProducts, similarities };
  }

  const searchText = search.toLowerCase();
  const filteredProducts = products.filter((p) => {
    return p.title.toLowerCase().startsWith(searchText);
  });
  return { products: filteredProducts };
});
