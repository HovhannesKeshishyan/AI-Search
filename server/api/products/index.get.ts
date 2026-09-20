import cosineSimilarity from "compute-cosine-similarity";

interface queryData {
  search: string;
  enableSemanticSearch: "true" | "false";
  page?: string;
  limit?: string;
}

const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 100;

function getProductsListDTO(products: Product[]) {
  return products.map((p) => getProductDTO(p));
}

function paginate<T>(items: T[], page: number, limit: number) {
  const start = (page - 1) * limit;
  return { items: items.slice(start, start + limit), total: items.length };
}

export default defineEventHandler(async (event) => {
  const {
    search = "",
    enableSemanticSearch,
    page: pageParam,
    limit: limitParam,
  } = getQuery<queryData>(event);

  const page = Math.max(1, Number(pageParam) || 1);
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, Number(limitParam) || DEFAULT_LIMIT),
  );

  const products = await getProductsFromDB();

  if (!search.trim()) {
    const { items, total } = paginate(products, page, limit);
    return { products: getProductsListDTO(items), total, page, limit };
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

    const { items, total } = paginate(filteredProducts, page, limit);
    return {
      products: getProductsListDTO(items),
      total,
      page,
      limit,
      similarities,
    };
  }

  const searchText = search.toLowerCase();
  const filteredProducts = products.filter((p) => {
    return p.title.toLowerCase().startsWith(searchText);
  });
  const { items, total } = paginate(filteredProducts, page, limit);
  return { products: getProductsListDTO(items), total, page, limit };
});
