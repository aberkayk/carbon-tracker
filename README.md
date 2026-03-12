# Climateware Carbon Travel Tracker

A web application for recording flight transportation data, calculating carbon emissions, converting emissions into monetary offset values, and reviewing/exporting results.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| UI Framework | React 19 + TypeScript | Component rendering, type safety |
| State Management | Zustand 5 + `persist` middleware | Global state with automatic localStorage sync |
| Routing | React Router v7 | Client-side navigation, protected routes |
| Internationalisation | i18next + react-i18next | EN / TR language switching |
| Styling | Tailwind CSS v4 | Utility-first CSS, custom color tokens via CSS variables |
| Build Tool | Vite 7 | Dev server, HMR, production bundling |
| Testing | Vitest 4 + React Testing Library | Unit & integration tests, jsdom environment |
| SVG Icons | vite-plugin-svgr | Import `.svg` files as React components |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

On first load, mock data is automatically seeded into `localStorage` so you can explore the app without registering.

**Mock credentials:**

```
Email:    demo@climateware.com
Password: demo1234
```

> Alternatively, you can register a new account with any email address via the Sign Up page.

### Build for production

```bash
npm run build
```

Output is written to `dist/`. Serve with any static file host or:

```bash
npm run preview   # local preview of the production build
```

### Lint

```bash
npm run lint
```

---

## Running Tests

### Watch mode (re-runs on file save)

```bash
npm test
```

### Single run — CI / manual check

```bash
npm run test:run
```

Expected output: **39 tests pass across 4 files**.

### Test environment details

| Setting | Value |
|---|---|
| Test runner | Vitest |
| DOM environment | jsdom |
| Setup file | `tests/setup.ts` |
| Test utilities | `tests/test-utils.tsx` (custom render with MemoryRouter + i18n) |

The setup file mocks `HTMLDialogElement.prototype.showModal` and `.close` because jsdom does not implement the native `<dialog>` API. This allows `<Modal>` and `<Alert>` components to render correctly in tests.

---

## Test Coverage

### Unit tests — `src/lib/`

#### `calculation.test.ts` (10 tests)

Tests every exported pure function in `src/lib/calculation.ts`:

| Test | What it verifies |
|---|---|
| `calculateLegEmission` | `distanceKm × weightKg × emissionFactor` produces correct result |
| `calculateLegAmount` | `emissionKg × basePricePerKg × fxRate` produces correct result |
| `calculateGroupTotals` | Summing multiple leg objects returns correct aggregate |
| `calculateDashboardTotals` | Summing multiple trip groups returns correct totals and leg count |
| `calculateDashboardTotals` (empty) | Returns all zeros for an empty groups array |
| `calculateEquivalents` | Each equivalency metric is correctly multiplied by its factor |
| `formatNumber` (decimals) | Formats `1234.567` to 2 decimal places (locale-aware) |
| `formatNumber` (integer) | Formats `1234` to 0 decimal places |
| `formatCurrency` (symbol) | Formatted EUR string contains `€` or `EUR` and the numeric value |
| `formatCurrency` (decimals) | Formatted USD string contains `.50` for input `9.5` |

#### `validation.test.ts` (22 tests)

Tests every exported function in `src/lib/validation.ts`:

| Function | Cases tested |
|---|---|
| `validateRequired` | Empty string → error; non-empty → null |
| `validateEmail` | Valid email → null; missing `@` → error; empty → required error |
| `validatePositiveNumber` | Positive value → null; zero → error; negative → error; NaN → error |
| `validateDate` | Valid ISO date → null; empty → required error; garbage string → invalid error |
| `validateGroupName` | Delegates to `validateRequired`; empty → error; filled → null |
| `validateSignUpForm` | All fields valid → no errors; missing fields → errors for each; terms not accepted → terms error |
| `validateLoginForm` | Valid data → no errors; missing email → email error; missing password → password error |
| `validateLeg` | All fields valid → no errors; missing required fields → errors for each |

### Integration tests — `tests/`

#### `login.test.tsx` (3 tests)

Renders `<LoginForm>` inside `MemoryRouter` with i18n loaded. Zustand auth store is reset in `beforeEach` via `useAuthStore.setState`.

| Test | Scenario |
|---|---|
| Valid credentials | Types correct email + password → expect `navigate("/dashboard")` called |
| Invalid credentials | Types wrong credentials → expect alert rendered, navigate NOT called |
| Empty form | Submits without filling fields → expect validation alerts rendered |

#### `add-transportation.test.tsx` (4 tests)

Renders `<AddTransportationModal>` with auth store pre-seeded with a mock user (currency: `EUR`). Transport store is reset to `groups: []` in `beforeEach`.

| Test | Scenario |
|---|---|
| Save valid group | Fills all fields → submit → Zustand store contains 1 group with correct data |
| Emission calculation | weight=100kg, distance=1000km → `emissionKg ≈ 1.2`, `amount ≈ 0.6` |
| Validation on empty submit | Submits empty form → alert elements rendered, store remains empty |
| Cancel | Types group name → clicks Cancel → `onClose` called, store remains empty |

---

## Calculation Logic

All formula logic lives in pure functions in `src/lib/calculation.ts`. No React dependencies — fully unit-testable in isolation.

### 1. Leg Emission

```
emissionKg = distanceKm × weightKg × emissionFactor
```

- `emissionFactor` = `0.000012` (kgCO₂e per km per kg of cargo)
- Example: 1000 km × 100 kg × 0.000012 = **1.2 kgCO₂e**

### 2. Leg Amount (offset cost)

```
amount = emissionKg × basePricePerKg × fxRate
```

- `basePricePerKg` = `0.5` EUR per kgCO₂e
- `fxRate` is looked up from the user's selected currency (see FX Rates below)
- Example: 1.2 kgCO₂e × 0.5 EUR × 1.0 (EUR) = **0.60 EUR**

### 3. Group Totals

The store calls `calculateGroupTotals(legs)` which reduces all legs:

```
distanceKm  = Σ leg.distanceKm
weightKg    = Σ leg.weightKg
emissionKg  = Σ leg.emissionKg
amount      = Σ leg.amount
```

### 4. Dashboard Totals

`calculateDashboardTotals(groups)` reduces all groups:

```
totalEmissionKgCO2e            = Σ group.totals.emissionKg
totalDistanceKm                = Σ group.totals.distanceKm
totalLegCount                  = Σ group.legs.length
totalPaymentInSelectedCurrency = Σ group.totals.amount
```

### 5. Equivalency Impacts

`calculateEquivalents(totalEmissionKgCO2e, factors)` maps the total emission to four real-world equivalencies:

| Property | Factor | Meaning |
|---|---|---|
| `equivalentKmDriven` | × 0.12823 | Kilometres driven by an average car |
| `equivalentSeaIceM3` | × 0.00008985 | m³ of Arctic sea ice melted |
| `equivalentLightbulbDays` | × 0.10724 | Days a 10W LED bulb runs |
| `equivalentBeefKg` | × 0.00089883 | kg of beef produced |

### Currency / FX Rates

All amounts are calculated in EUR first, then converted. Rates are static constants in `src/lib/constants.ts`:

```ts
fxRates: { EUR: 1, USD: 1.08, TRY: 34.5, GBP: 0.86 }
```

When the user changes their preferred currency, `recalculateAllAmounts(currency)` is called in the transport store which re-applies the new FX rate to all stored `emissionKg` values without re-fetching data.

---

## Project Structure

```
.
├── src/
│   ├── assets/
│   │   └── icons/             # SVG icon files + barrel export
│   ├── components/
│   │   ├── auth/              # LoginForm, SignUpForm, SocialButtons
│   │   ├── dashboard/         # SummaryCards, HistoryDesktopTable, HistoryCard,
│   │   │                      #   DetailOverlay, AmountDropdown
│   │   ├── transportation/    # AddTransportationModal, EditTransportationModal, LegRow
│   │   ├── profile/           # ProfileForm, EditAccountModal
│   │   ├── layout/            # Header, Footer, MobileMenu, LanguageDropdown,
│   │   │                      #   ProfileDropdown
│   │   └── ui/                # Button, Input, Modal, Alert, Card,
│   │                          #   Pagination, Checkbox (reusable primitives)
│   ├── hooks/
│   │   └── useDeviceType.ts   # Returns "mobile" | "tablet" | "desktop"
│   │                          #   based on window width (used for responsive layout)
│   ├── i18n/
│   │   ├── i18n.ts            # i18next initialisation; reads language from localStorage
│   │   └── locales/
│   │       ├── en.json        # English strings
│   │       └── tr.json        # Turkish strings
│   ├── lib/
│   │   ├── calculation.ts     # Pure calculation functions (emission, amount, totals,
│   │   │                      #   equivalents, formatting)
│   │   ├── calculation.test.ts
│   │   ├── validation.ts      # Form validation functions (required, email, number, date,
│   │   │                      #   composite form validators)
│   │   ├── validation.test.ts
│   │   ├── export.ts          # exportGroupToJson — builds ExportPayload and triggers
│   │   │                      #   browser download as .json file
│   │   └── constants.ts       # DEFAULT_CONFIG (emission factor, FX rates, equivalency
│   │                          #   factors), supported currencies/languages, nav links
│   ├── mocks/
│   │   ├── data.ts            # seedUser + seedGroups fixture data
│   │   └── seed.ts            # seedLocalStorage() — called on app boot in dev mode
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── LoginPage.tsx
│   │   │   └── SignUpPage.tsx
│   │   ├── Dashboard/
│   │   │   └── DashboardPage.tsx
│   │   └── Profile/
│   │       └── ProfilePage.tsx
│   ├── stores/
│   │   ├── authStore.ts       # Zustand store: user, isAuthenticated, login, signUp,
│   │   │                      #   logout, updateUser — persisted under "auth-storage"
│   │   └── transportStore.ts  # Zustand store: groups[], addGroup, updateGroup,
│   │                          #   deleteGroup, recalculateAllAmounts
│   │                          #   — persisted under "transport-storage"
│   └── types/
│       └── index.ts           # Shared TypeScript interfaces: User, TripLeg, TripGroup,
│                              #   CalculationConfig, EquivalentImpact, ExportPayload,
│                              #   DashboardTotals
├── tests/
│   ├── setup.ts               # Vitest global setup: @testing-library/jest-dom matchers +
│   │                          #   HTMLDialogElement mock
│   ├── test-utils.tsx         # renderWithProviders helper (MemoryRouter + i18n)
│   ├── login.test.tsx         # Integration: Login flow
│   └── add-transportation.test.tsx # Integration: Add transportation modal flow
└── vite.config.ts             # Vite + Vitest config (jsdom, setupFiles)
```

---

## State Management

### `authStore` (`src/stores/authStore.ts`)

Persisted under the `"auth-storage"` key in localStorage via Zustand `persist` middleware.

| Action | Behaviour |
|---|---|
| `login(email, password)` | Reads `"registered_users"` from localStorage, finds matching user, sets `user` + `isAuthenticated: true`; returns `boolean` |
| `signUp(data)` | Checks for duplicate email; creates new `User` with `crypto.randomUUID()`; appends to `"registered_users"`; auto-logs in |
| `logout()` | Sets `user: null`, `isAuthenticated: false` |
| `updateUser(updates)` | Merges partial updates into current user; syncs back to `"registered_users"` in localStorage |

### `transportStore` (`src/stores/transportStore.ts`)

Persisted under `"transport-storage"`.

| Action | Behaviour |
|---|---|
| `addGroup(name, rawLegs, currency)` | Generates UUID for group; calls `buildLegs` to compute `emissionKg` + `amount` per leg; calls `calculateGroupTotals`; appends group |
| `updateGroup(groupId, ...)` | Rebuilds all legs from scratch with new data; replaces group in array |
| `deleteGroup(groupId)` | Filters group out of array |
| `recalculateAllAmounts(currency)` | Re-applies FX rate to all existing legs using stored `emissionKg` values |

---

## Routing

| Path | Component | Access |
|---|---|---|
| `/` | Redirect → `/login` | Public |
| `/login` | `LoginPage` | Guest only (redirects to `/dashboard` if authenticated) |
| `/signup` | `SignUpPage` | Guest only |
| `/dashboard` | `DashboardPage` | Protected (redirects to `/login` if not authenticated) |
| `/profile` | `ProfilePage` | Protected |

---

## Internationalisation

Language is stored in `localStorage` under the key `"language"` and read on i18n initialisation (`src/i18n/i18n.ts`). The user can switch between EN and TR from the header dropdown. Switching calls `i18n.changeLanguage(code)` and persists the choice.

All user-visible strings live in `src/i18n/locales/en.json` and `tr.json`. Components use the `useTranslation` hook with keys like `t("dashboard.totalEmissions")`.

---

## Assumptions

1. **No backend** — all data persists in `localStorage`. No server-side state or API calls.
2. **Social login is UI-only** — Google and Facebook buttons are present per the design but do not perform real OAuth flows. Integration credentials were not provided.
3. **Passwords stored in plain text** — this is a mock implementation. In production, passwords must be hashed (e.g. bcrypt).
4. **Currency exchange rates are static** — FX rates are defined as constants. A real implementation would fetch live rates from an exchange-rate API.
5. **Flight number format** — accepts any non-empty string; no airline-specific format validation is applied.
6. **Date input** — relies on the browser's native `<input type="date">` behaviour.

---

## Trade-off Decisions

| Decision | Rationale |
|---|---|
| **localStorage over MSW** | MSW is installed and could simulate a REST API more realistically. localStorage was chosen for simplicity given the scope; the MSW `handlers` directory is the natural next step if a mock API is needed. |
| **Zustand over Redux** | Zustand provides equivalent state management with significantly less boilerplate. The `persist` middleware covers localStorage persistence cleanly without extra middleware configuration. |
| **Native `<dialog>` element** | Used for `<Modal>` and `<Alert>` to get built-in focus trapping and Esc-to-close behaviour for free, instead of a custom overlay implementation. Requires a jsdom polyfill in tests. |
| **Tailwind CSS v4** | Latest version was selected. Some utility class names differ from v3 documentation. Custom colour tokens (`darkblue-100`, `red-100`, etc.) are defined via CSS `@theme` variables. |
| **Calculation logic isolated in `src/lib/`** | All formula logic lives in pure functions with no UI or store dependencies, making them independently testable and easy to swap out if emission factors change. |
| **`Intl.NumberFormat` for formatting** | `formatNumber` and `formatCurrency` use the browser's built-in `Intl` API for locale-aware formatting. Test assertions use regex patterns to accommodate different locale separators (`,` vs `.`). |
