# AI-Search

Admin-managed product catalog with search. Admins create/edit products; users can search them either with plain keyword matching or semantic (embedding-based) search.

## Commands

- `npm run dev` — start local dev server with hot reload
- `npm run lint` / `npm run lint:fix` — lint / lint and auto-fix
- `npm run build` — production build
- `npm run preview` — preview the production build locally

## Architecture

- `shared/` holds only types and framework-agnostic utils (`shared/types/*`, `shared/utils/*`) used by both `app/` and `server/` — e.g. `validateProductForm.ts` and the constants in `constants.ts`. Nothing here imports Vue/Nuxt or server-only modules (Cloudinary, Redis, JWT).
- `server/` owns all backend logic: product CRUD (`server/api/products/*`), auth (`server/api/auth/*`), and cross-cutting middleware (`server/middleware/auth.ts` checks the `auth_token` cookie and blocks non-admins from POST/PUT/DELETE on `/api/products`). `server/utils/` wraps external services: `generateEmbeddings.ts` (Gemini), `cloudinary.ts`, `redis.ts`, `tokens.ts` (JWT).
- `app/` owns everything user-facing: pages, components, composables (`useAuthUser.ts`), and route middleware (`app/middleware/admin.ts`, `guest.ts`).
- Search data flow (`server/api/products/index.get.ts`): a request comes in with `search` and `enableSemanticSearch`. If semantic search is on, the query text is embedded via `generateEmbedding()` (Gemini `gemini-embedding-001`), then compared against each product's precomputed `embeddings` with cosine similarity (threshold `> 0.7`). If semantic search is off (or no embedding came back), it falls back to a plain `startsWith` match on the product title.

## Conventions

- Double quotes, enforced by `eslint.config.mjs` (prettier + `quotes: ["error", "double"]`) — run `npm run lint:fix` before committing.
- Server route files follow Nuxt/H3 naming: `index.get.ts`, `index.post.ts`, `[id].get.ts`, etc. — method and dynamic params are encoded in the filename.
- Cross-boundary constants (page size limits, upload size limits) belong in `shared/utils/constants.ts`, not duplicated locally — see the comment there: "Shared between client and server so validation/limits can't drift apart."

## Environment / Gotchas

- Required env vars for `npm run dev` (see `.env.example`): `JWT_ACCESS_SECRET`, `GEMINI_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`. Without `GEMINI_API_KEY`, semantic search silently falls back to plain text search (`generateEmbedding` catches the error and returns `null`).
- Auth is cookie-based JWT (`auth_token` cookie, verified in `server/middleware/auth.ts`), with an `ADMIN` role gating write access to products. Treat this middleware and `server/utils/tokens.ts` as sensitive — a bug here affects who can mutate the product catalog.
- The `similarities` object returned by the products GET endpoint is explicitly marked in the code as "just for testing in browser" — it's debug output, not meant to become a permanent part of the API contract.

## Things to avoid

<!-- Nothing here yet — add rules as they come up (e.g. after I do something you don't like). -->
