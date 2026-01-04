# Umesh Jewellers – AI Coding Agent Instructions

## Architecture Overview
**Bilingual MERN e-commerce app** for jewelry inventory (Juna Sona/Old Gold, Naya Sona/New Gold, Cancelled Orders).

- **Frontend**: React 18 + Vite + React Router + Tailwind CSS, proxied to `/api` → `http://localhost:5000`
- **Backend**: Express + Mongoose + MongoDB, follows strict MVC: `routes → controllers → models`
- **Key Design**: Product has `inventoryType` (enum: "Juna Sona", "Naya Sona", "Order Cancelled Product") and `category` (9 fixed categories: bangles, earrings, necklace, ring, chain, pendant, bracelet, mixed product, other)

## Data Model Essentials
**Product Schema** (`server/src/models/product.model.js`):
- **Gold Rate Logic**: `goldRateType` ∈ {`single`, `range`} with conditional required fields—use `single` for fixed prices, `range` for min/max pricing
- **Validation**: All category & inventoryType values are strict MongoDB enums; imageURL is required
- **Timestamps**: `createdAt`, `updatedAt` auto-managed; `goldRateUpdatedOn` tracks rate change date
- **Defaults**: `isActive: true`, `goldRateType: single`

## Naming Conventions
- **Files/Folders**: kebab-case (`product.controller.js`, `CategoryFilter.jsx`)
- **React Components**: PascalCase exports (`ProductCard`, `InventoryTypePage`)
- **Variables/Functions**: camelCase
- **Mongo Models**: PascalCase (`Product`)

## Development Setup
```bash
# Terminal 1: Frontend (port 5173, hot reload)
cd client && npm install && npm run dev

# Terminal 2: Backend (port 5000, requires .env)
cd server && npm install && npm run dev
```

**server/.env required**:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<dbname>
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
```

## API Contract
All routes under `/api/products`. Controllers use `next(err)` for error handling.
- **GET /** — list products; filters: `?category=bangles&inventoryType=Juna Sona&q=search` (case-insensitive `$regex`)
- **GET /:id** — fetch single product
- **POST /** — create; validates schema; returns 201 + product
- **PATCH /:id** — update with `runValidators: true`; returns 200 + updated product
- **DELETE /:id** — remove; returns 204 no-content

## Frontend Patterns
- **i18n**: React-i18next; translations in `src/i18n.js` (EN/HI). Access via `useTranslation()` → `t('key')` or `t('categories.bangles')`
- **Routing**: `App.jsx` defines inventory type routes + optional `:category` param; no query-string filtering
- **HTTP**: Axios calls proxied via Vite to `/api`; errors handled per-component (no global boundary yet)
- **Styling**: Tailwind 3 + extended theme (`tailwind.config.js`): custom colors (cream, gold, brown variants)

## Error Handling
- **Backend**: `notFound()` + `errorHandler()` in `error.middleware.js`; logs errors, returns JSON with message
- **Frontend**: Catch errors in component handlers; no global boundary—consider adding if expanding

## Key Quirks & Patterns
1. **Gold rates**: Validate `goldRateType` before reading `goldRateValue` or `goldRateMin/Max`—schema enforces via conditional required
2. **Axios calls**: Check `vite.config.js` proxy; route via `/api` prefix
3. **Image handling**: ProductForm.jsx expects `imageURL` (string, single); supports file upload or URL input
4. **CORS**: Bound to `CLIENT_ORIGIN` env; don't relax scope without reason
5. **HTTP verb**: Uses PATCH (not PUT) for updates—partial updates

## Common Tasks
- **Add Inventory Type**: Update `inventoryEnum` in model → add i18n key (`junaSona`, `nayaSona`, `orderCancelledProduct`) → add routes in `App.jsx`
- **Add Product Field**: Extend schema → update controller if filtering required → update form & display components if user-facing
- **Extend Styling**: Modify `tailwind.config.js` theme, not component CSS
- **Debug APIs**: Use DevTools Network tab; Vite dev server logs requests

## File Reference
- [server/src/index.js](server/src/index.js) — middleware stack, MongoDB connect, health check `/api/health`
- [server/src/models/product.model.js](server/src/models/product.model.js) — schema enums, validators
- [server/src/controllers/product.controller.js](server/src/controllers/product.controller.js) — CRUD logic, filtering
- [server/src/routes/product.routes.js](server/src/routes/product.routes.js) — endpoint map
- [client/src/i18n.js](client/src/i18n.js) — all translations (EN/HI)
- [client/src/App.jsx](client/src/App.jsx) — route structure
- [client/tailwind.config.js](client/tailwind.config.js) — color theme
