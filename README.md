# Umesh Jewellers – Digital Reference Book

A bilingual, mobile-first MERN app for showcasing jewellery inventory (Juna Sona, Naya Sona, Made on Order) with category-based navigation.

## Folder structure
```
client/              # React + Vite + Tailwind
  src/
    components/
    pages/
    context/
    assets/
server/              # Express + MongoDB (MVC)
  src/
    models/
    controllers/
    routes/
    middleware/
```

## Naming conventions
- Files and folders: kebab-case (e.g., product-card.jsx, product.routes.js).
- React components: PascalCase exports (e.g., ProductCard).
- Variables/functions: camelCase.
- Mongo models: PascalCase model names (e.g., Product).

## Getting started
Prerequisites: Node.js 18+, npm.

### Install
```
# from repo root
cd client && npm install
cd ../server && npm install
```

### Run (development)
```
# frontend
cd client
npm run dev

# backend
cd ../server
npm run dev
```

### Environment variables (server/.env)
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster/dbname
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
```

### Notes
- Use react-i18next for English/Hindi toggling.
- Keep controllers thin; put data logic in services/models.
- Add Tailwind config (tailwind.config.js, postcss.config.js) in client before styling.
- Prefer feature folders under components/ and pages/ to minimize merge conflicts.
