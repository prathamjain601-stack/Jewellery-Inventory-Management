# Umesh Jewellers – AI Coding Agent Instructions

## Architecture Overview
**Bilingual MERN e-commerce app** for jewelry inventory (Juna Sona/Old Gold, Naya Sona/New Gold, Cancelled Orders).

- **Frontend**: React 18 + Vite + React Router + Tailwind CSS, proxied to `/api` → `http://localhost:5000`
- **Backend**: Express + Mongoose + MongoDB, follows MVC: `routes → controllers → models`
- **Key Design**: Product has `inventoryType` (enum: "Juna Sona", "Naya Sona", "Order Cancelled Product") and `category` (bangles, earrings, etc.)

## Data Model
Product schema (`server/src/models/product.model.js`):
- **Gold Rate Strategy**: `goldRateType` ∈ {`single`, `range`} determines if `goldRateValue` (single) or `goldRateMin`/`goldRateMax` (range) are required
- **Timestamps**: `createdAt`, `updatedAt` auto-managed
- **Defaults**: `isActive: true`, `goldRateUpdatedOn: Date.now`
- **Validations**: Category & inventoryType are strict enums; image URL required

## Naming & File Organization
- **Files/Folders**: kebab-case (e.g., `product-routes.js`, `category-filter.jsx`)
- **React Components**: PascalCase exports (e.g., `ProductCard`)
- **Variables/Functions**: camelCase
- **Mongo Models**: PascalCase (e.g., `Product`)
- **Feature Structure**: Prefer feature-specific folders under `components/` and `pages/` to minimize conflicts

## Development Workflow

### Setup
```bash
cd client && npm install
cd ../server && npm install
```

### Running
```bash
# Terminal 1: Frontend (Vite dev server, port 5173)
cd client && npm run dev

# Terminal 2: Backend (Express, port 5000, requires .env)
cd server && npm run dev
```

### Environment Variables
`server/.env` **must** contain:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<dbname>
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
```

## Key API Routes
- **List**: `GET /api/products?category=<cat>&inventoryType=<type>&q=<search>` — filters via `$regex` (case-insensitive)
- **Get**: `GET /api/products/:id`
- **Create**: `POST /api/products` — requires valid schema; returns 201
- **Update**: `PUT /api/products/:id` — validates on update
- **Delete**: `DELETE /api/products/:id` — returns 204 no-content

## Frontend Patterns
- **i18n**: React-i18next manages EN/HI translations in `src/i18n.js`; use `useTranslation()` hook and access nested keys like `t('categories.earrings')`
- **Routing**: App.jsx maps routes to inventory types + optional `:category` parameter
- **Component Communication**: Likely context-based (check `context/` folder); Axios calls go through Vite proxy
- **Styling**: Tailwind + custom CSS in `index.css`; custom color utilities (`.cream-dark`, `.brown`, `.gold-dark`)

## Error Handling & Middleware
**Backend** (`server/src/middleware/error.middleware.js`):
- Centralizes error handling; all controller errors pass via `next(err)`
- 404 handler returns standard JSON; error handler logs & responds

**Frontend**:
- Axios calls handle errors in components; no global error boundary yet—add if needed

## Testing & Build
- **Client Build**: `npm run build` → minified dist/
- **Client Preview**: `npm run preview`
- **No test suite yet**—Jest + Vitest can be added; follow MVC pattern for unit tests

## Known Conventions & Quirks
1. **Product image**: Field name varies (`imageURL` in schema, but components check `imageURLs` array first with fallback to `imageURL`)
2. **Gold rates**: Always validate `goldRateType` before accessing rate fields—conditional required fields in schema enforce at DB level
3. **isActive flag**: Used internally; not exposed in API yet—safe to add filtering
4. **CORS**: Strictly bounded to `CLIENT_ORIGIN` env var; don't relax without reason

## Common Tasks
- **Add New Inventory Type**: Update `inventoryEnum` in `product.model.js` + add i18n key + new Route in `App.jsx`
- **Add Product Field**: Schema update → controller if filtering → component display if user-facing
- **Modify Styling**: Check `tailwind.config.js` for custom theme; update `index.css` for global overrides
- **Debug API Calls**: Check Vite proxy config in `vite.config.js`; use Network tab in DevTools

## Resources
- README.md for project vision & setup
- `server/src/index.js` for middleware stack & health check (`/api/health`)
- `client/src/components/` for Tailwind + i18n patterns
