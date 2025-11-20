# AI-Search

## Author: Hovhannes Keshishyan


[![Live Demo](https://img.shields.io/badge/demo-ai--search--semantic.vercel.app-brightgreen)](https://ai-search-semantic.vercel.app)

**AI-Search** is a semantic search web application built with **Nuxt.js**, **TypeScript**, and the **Vercel AI SDK**. It allows users to ask natural language queries and get intelligent, context-aware responses from indexed content.

---

## 🧠 Features

- **Natural-Language Search**: Users can type conversational queries, not just keywords.  
- **Semantic Embeddings**: Content is embedded into vector space, enabling meaning-based retrieval.

---

## 📁 Architecture

The repo is structured into several main parts:

- `app/`: Nuxt application — pages, and components.  
- `server/`: Backend logic — handles embedding generation, query processing, and AI interaction.  
- `shared/`: Shared utilities, types, and code used across frontend and backend.  
- `public/`: Static assets.  
- `.env.example`: Sample environment variables file.

---

## 🚀 Getting Started

Here’s how to run the project locally:

1. **Clone the repo**

   ```bash
   git clone https://github.com/HovhannesKeshishyan/AI-Search.git
   
2. **Go to project directory**

   ```bash
   cd AI-Search

3. **Install dependancies**

   ```bash
   npm install

4. **Copy .env.example to .env and fill in the required keys**


5. **Production build**

   ```bash
   npm run build

6. **Preview production build**

   ```bash
   npm run preview 

7. **Development build with HMR**

   ```bash
   npm run dev