import type { H3Event } from "h3";

const needValidatePayload = (event: H3Event) => {
  const { path, method } = event;
  return (
    path.startsWith("/api/products") &&
    ["POST", "PUT"].includes(method)
  );
};

export default defineEventHandler(async (event) => {
  if (!needValidatePayload(event)) {
    return;
  }

  const body = await readBody<{ product: ProductFormState }>(event);
  const product = body.product;

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Invalid payload",
    });
  }

  const fieldsForValidating = {
    title: product.title,
    description: product.description,
    price: product.price,
    image: product.image,
  };

  const { isValid, errors } = validateProductForm(fieldsForValidating);

  if (!isValid) {
    throw createError({
      statusCode: 404,
      statusMessage: "Invalid payload",
      data: errors,
    });
  }
});
