# Architecture

## Overview

Tenten is a multi-vendor marketplace built as a Laravel monolith. The frontend is React 19 served through Inertia.js, no separate API, no token juggling, no duplication of routing logic between client and server.

---

## Key Decisions

### Inertia.js over a REST/GraphQL API

A dedicated API would mean maintaining two routing layers, two auth systems, and serializing/deserializing data at every boundary. Since the frontend is not shared with a mobile app and the team is one person, Inertia removes that overhead entirely. Laravel handles routing and auth; React handles rendering. Server-side data is passed as props on the initial page load and on navigation — no fetch boilerplate, no loading states for basic page data.

The tradeoff: if a mobile app or external integration is ever needed, an API layer has to be added later. That's an acceptable future cost.

### Filament for the Admin Panel

Building a custom admin from scratch for a marketplace (product approval, vendor management, order oversight, content editing) is weeks of work that adds no user-facing value. Filament provides all of that out of the box and integrates directly with Eloquent — no separate admin database layer or serialization layer needed.

The dynamic form builder (`FilamentFormBuilderService`) extends Filament to generate forms at runtime from JSON schemas, which lets non-technical admins edit page content without a deployment.

### JSON-Driven Page Templates

The home page and product detail layouts are defined as JSON schema files (`app/Templates/Layouts/`). The Filament admin reads those schemas to build editing forms dynamically. Content is saved to the database as JSON and merged with the schema at render time.

This means adding a new content section is a JSON edit + one artisan command, not a code change. The tradeoff is that the schema format is custom and has to be maintained — there's no off-the-shelf CMS powering it.

### Nested Set Model for Categories

The category tree (Departments → Categories → Subcategories) is queried on almost every page load — navigation menus, filter sidebars, breadcrumbs. A naive adjacency list model requires N+1 queries to walk the tree. The Nested Set Model (`kalnoy/nestedset`) stores left/right boundary values that make full-tree fetches a single query, at the cost of slower writes when the tree is restructured. For a category tree that rarely changes, that's the right tradeoff.

### Stripe Connect for Vendor Payouts

Vendors are independent businesses, not employees. Tenten collects customer payments, deducts a platform commission (10%) and Stripe's processing fees, then transfers the remainder to each vendor's connected Stripe account. This means:

- Vendors never touch customer card data — Stripe handles PCI compliance
- Transfers happen programmatically via the `payout:vendors` scheduled command
- Each vendor's balance is tracked independently in the database

The alternative (manual bank transfers or PayPal) doesn't scale and introduces reconciliation problems. Stripe Connect is more setup but correct by design.

### Spatie Permission for RBAC

Four roles: CLIENT, VENDOR, ADMIN, MASTER_ADMIN. Access control is enforced at three layers:

1. **Middleware** — route groups are gated by role
2. **Policies** — model-level authorization (e.g. a VENDOR can only edit their own products)
3. **Filament resource visibility** — admin resources check roles before rendering

Spatie's package stores roles and permissions in the database, which means they can be managed without a deployment. The tradeoff is a small overhead on authenticated requests (role check queries, mitigated by caching).

---

## Data Flow

```
Browser
  └── Inertia request (GET /products/123)
        └── Laravel Router
              └── ProductController@show
                    ├── Loads Product + Variations + Vendor (eager loaded)
                    ├── Checks policy (can user view this product?)
                    └── Returns Inertia::render('Product/Show', $data)
                          └── React renders with $data as props
```

For mutations (add to cart, checkout):
```
React form submit (POST)
  └── Laravel Controller
        ├── Validates request (FormRequest)
        ├── Executes service (CartService / StripeController)
        └── Returns Inertia redirect or JSON (for JS-only interactions)
```

---

## Payment Flow

```
Customer checkout
  └── StripeController::checkout()
        └── Creates Stripe Checkout Session (line items per vendor)
              └── Stripe redirects to /stripe/success on completion
                    └── Webhook (POST /stripe/webhook)
                          ├── Verifies signature
                          ├── Creates Order records
                          └── Stores payout amounts per vendor

Monthly (1st of month, 00:00)
  └── payout:vendors artisan command
        └── Queries unpaid vendor balances
              └── Stripe Transfer to each vendor's connected account
                    └── Marks payouts as completed in DB
```

---

## Backend Architecture

The backend follows a **thin controller, fat service** pattern. Controllers are responsible only for receiving the request, delegating to a service or model, and returning a response. Business logic lives in `app/Services/`.

**Request lifecycle:**
```
Route → Middleware → FormRequest (validation) → Controller → Service → Model → Response
```

**Layers:**

| Layer | Responsibility |
|---|---|
| Routes | URL → controller mapping, middleware assignment |
| Middleware | Auth, role checks, CSRF, verified email gate |
| FormRequests | Input validation and authorization per action |
| Controllers | Orchestrate the request — call services, return Inertia/JSON |
| Services | Business logic — CartService, TemplateService, etc. |
| Models | Eloquent ORM — relationships, casts, scopes |
| Policies | Per-model authorization rules per role |

**Enums** replace magic strings throughout the codebase — `RolesEnum`, `OrderStatusEnum`, `ProductStatusEnum` etc. are all PHP backed enums, making role/status comparisons type-safe and IDE-friendly.

---

## Frontend Architecture

The frontend is a React 19 app driven by Inertia.js. There is no client-side router — Laravel's router handles all navigation. When a link is clicked, Inertia intercepts it, makes an XHR to the server, and swaps the page component with the new props. From the user's perspective navigation feels instant with no full-page reloads; from the developer's perspective there's only one routing layer.

**Component structure:**

| Layer | Purpose |
|---|---|
| `Pages/` | One component per route. Receives server props directly. No data fetching logic inside. |
| `Layouts/` | Persistent shell (nav, footer) that wraps page components |
| `Components/App/` | Domain-specific — `ProductCard`, `CartDrawer`, `VendorBadge`, etc. |
| `Components/Core/` | Generic and reusable — `Modal`, `Pagination`, `Alert`, etc. |
| `types/` | Shared TypeScript interfaces matching Laravel model shapes |

**State management:** No Redux or Zustand. Most state is server-driven via Inertia props. Local UI state (open/close modals, selected variation) lives in component `useState`. The cart is the only cross-component state, managed server-side with session persistence.

**Forms:** Inertia's `useForm` hook handles form state, submission, and error display — no react-hook-form or formik needed for standard forms.

---

## Directory Structure

```
app/
├── Enums/                  # Backed enums: RolesEnum, OrderStatusEnum, etc.
├── Filament/               # Admin panel — Resources, Pages, Widgets
├── Http/
│   ├── Controllers/        # Thin controllers — delegate to Services
│   ├── Middleware/         # Request filtering and auth
│   └── Requests/           # FormRequest validation classes
├── Models/                 # Eloquent models with relationships
├── Policies/               # Authorization — per-model, per-role rules
├── Providers/              # Service providers (AppServiceProvider, etc.)
├── Services/               # Business logic (CartService, TemplateService, etc.)
├── StripeConnect/          # Inlined Stripe Connect helpers (Payable trait, etc.)
└── Templates/Layouts/      # JSON page schema definitions

resources/js/
├── Components/
│   ├── App/                # Domain-specific components (ProductCard, CartItem)
│   └── Core/               # Generic UI components (Modal, Pagination, etc.)
├── Layouts/                # App shell and admin layout wrappers
├── Pages/                  # One file per route (Inertia page components)
├── types/                  # Shared TypeScript interfaces
└── helpers.ts              # Utility functions
```

---

## What Would Change at Scale

- **Queue driver**: Currently sync in dev, database in prod. Redis + Horizon for high volume.
- **Cache driver**: File cache is fine for single-server. Redis when horizontal scaling is needed.
- **Search**: Product search is currently a basic Eloquent query. Meilisearch or Algolia via Laravel Scout for full-text.
- **Media storage**: Local disk in dev, S3-compatible object storage in prod (already abstracted via Laravel's filesystem).
