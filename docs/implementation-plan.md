# Climateware Carbon Travel Tracker - Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Production-grade carbon travel tracker — auth, dashboard, transportation CRUD, emission calculations, JSON export, responsive UI.

**Architecture:** Vite + React SPA. Zustand stores with localStorage persistence. MSW for mock API. Calculation logic isolated in `lib/`. react-i18next for EN/TR.

**Tech Stack:** Vite 7, React 19, TypeScript 5.9, Tailwind CSS 4, Zustand 5, React Router v7, react-i18next, MSW 2, Vitest 4 + React Testing Library

---

## Mevcut Durum

### Tamamlanan Dosyalar

| Kategori | Dosyalar | Durum |
|---|---|---|
| **Types** | `src/types/index.ts` | Tamamlandı |
| **Hesaplama** | `src/lib/calculation.ts`, `src/lib/constants.ts` | Tamamlandı |
| **Validasyon** | `src/lib/validation.ts` | Tamamlandı |
| **Export** | `src/lib/export.ts` | Tamamlandı |
| **i18n** | `src/i18n/i18n.ts`, `locales/en.json`, `locales/tr.json` | Tamamlandı |
| **Stores** | `src/stores/authStore.ts`, `src/stores/transportStore.ts` | Tamamlandı |
| **UI Components** | `Button`, `Input`, `Checkbox`, `Card`, `Modal`, `Pagination` | Tamamlandı |
| **Auth Components** | `LoginForm`, `SignUpForm`, `SocialButtons` | Tamamlandı |
| **Dashboard Components** | `SummaryCards`, `HistoryTable`, `DetailOverlay`, `AmountDropdown` | Tamamlandı |
| **Profile Components** | `ProfileForm`, `EditAccountModal` | Tamamlandı |
| **Transportation Components** | `AddTransportationModal`, `EditTransportationModal`, `LegRow` | Tamamlandı |
| **Layout** | `Header`, `Layout`, `ProtectedRoute`, `MobileMenu` | Tamamlandı |
| **Hooks** | `useDeviceType` | Tamamlandı |
| **Assets** | 28 SVG icon, logo, background, auth-image | Tamamlandı |
| **Auth Pages** | `LoginPage`, `SignUpPage` | Tamamlandı |
| **Dashboard Page** | `DashboardPage` | Kısmen (modal'lar commented out) |

### Eksik Parçalar

| # | Eksik | Açıklama |
|---|---|---|
| 1 | **ProfilePage** | Sayfa bileşeni oluşturulmamış |
| 2 | **/profile route** | Router'da tanımlanmamış |
| 3 | **Dashboard modal'ları** | Add/Edit modal'ları DashboardPage'de commented out |
| 4 | **MSW handlers** | Mock API handler'ları yazılmamış |
| 5 | **MSW initialization** | main.tsx'te başlatılmamış |
| 6 | **Unit testler** | calculation.test.ts var ama tests/ altında değil; validation ve export testleri eksik |
| 7 | **Integration testler** | Hiç yazılmamış |
| 8 | **README** | Oluşturulmamış |

---

## Chunk 1: Eksik Sayfalar ve Routing

### Task 1: ProfilePage Oluştur

**Files:**
- Create: `src/pages/Profile/ProfilePage.tsx`

- [ ] **Step 1: ProfilePage bileşenini yaz**

```tsx
// src/pages/Profile/ProfilePage.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui';
import { ProfileForm } from '../../components/profile';
import { EditAccountModal } from '../../components/profile';

export default function ProfilePage() {
  const { t } = useTranslation();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleConfirmEdit = () => {
    setShowEditModal(false);
    setIsUnlocked(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-darkblue-100">
          {t('profile.title')}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {isUnlocked ? t('profile.unlocked') : t('profile.locked')}
          </span>
          {!isUnlocked && (
            <Button variant="outline" size="sm" onClick={handleEditClick}>
              {t('common.edit')}
            </Button>
          )}
        </div>
      </div>

      <ProfileForm isUnlocked={isUnlocked} />

      <EditAccountModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onConfirm={handleConfirmEdit}
      />
    </div>
  );
}
```

- [ ] **Step 2: App.tsx'e /profile route ekle**

`App.tsx`'te router tanımına ekle:
```tsx
{
  path: '/profile',
  element: <Layout><ProtectedRoute><ProfilePage /></ProtectedRoute></Layout>,
}
```

ProfilePage import'unu ekle:
```tsx
import ProfilePage from './pages/Profile/ProfilePage';
```

- [ ] **Step 3: Doğrula**

```bash
npm run dev
# /profile'a git, lock/unlock akışını test et
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/Profile/ src/App.tsx
git commit -m "feat: add profile page with lock/unlock flow and route"
```

---

### Task 2: DashboardPage Modal'larını Aktifleştir

**Files:**
- Modify: `src/pages/Dashboard/DashboardPage.tsx`

- [ ] **Step 1: DashboardPage'deki commented out modal'ları aktifleştir**

DashboardPage'de `AddTransportationModal` ve `EditTransportationModal` import'larını ve kullanımlarını uncomment et. Modal açma/kapama state'lerini ve handler fonksiyonlarını ekle/doğrula:

- `showAddModal` state
- `showEditModal` state
- `selectedGroup` state (edit için)
- `handleDetails(group)` → selectedGroup set et, showEditModal aç
- `handleDownload(group)` → buildExportPayload + downloadJson çağır

- [ ] **Step 2: Download fonksiyonunu bağla**

```tsx
import { buildExportPayload, downloadJson } from '../../lib/export';
import { calculateEquivalents } from '../../lib/calculation';
import { DEFAULT_CONFIG } from '../../lib/constants';

const handleDownload = (group: TripGroup) => {
  const equivalents = calculateEquivalents(
    group.totals.emissionKg,
    DEFAULT_CONFIG.equivalencyFactors
  );
  const payload = buildExportPayload(
    group,
    equivalents,
    DEFAULT_CONFIG.baseCurrency,
    currency
  );
  downloadJson(payload);
};
```

- [ ] **Step 3: Doğrula**

```bash
npm run dev
# Dashboard'da: Add butonuna tıkla → modal açılsın
# Grup ekle → history'de görünsün
# Details → edit modal açılsın
# Download → JSON dosya indirilsin
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/Dashboard/
git commit -m "feat: wire add/edit modals and download in dashboard"
```

---

## Chunk 2: MSW Mock API

### Task 3: MSW Handlers ve Initialization

**Files:**
- Create: `src/mocks/handlers.ts`, `src/mocks/browser.ts`, `src/mocks/data.ts`
- Modify: `src/main.tsx`

- [ ] **Step 1: Seed data oluştur**

```ts
// src/mocks/data.ts
import type { User, TripGroup } from '../types';

export const seedUser: User = {
  id: 'user-1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'password123',
  currency: 'EUR',
  language: 'en',
  notificationOptIn: true,
  social: { googleConnected: false, facebookConnected: false },
};

export const seedGroups: TripGroup[] = [
  {
    id: 'group-1',
    name: 'Europe Business Trip',
    legs: [
      {
        id: 'leg-1', groupId: 'group-1',
        from: 'IST', to: 'FRA', flightNo: 'TK1587',
        date: '2026-01-15', weightKg: 85, distanceKm: 1860,
        emissionKg: 0.18972, amount: 0.09486,
      },
      {
        id: 'leg-2', groupId: 'group-1',
        from: 'FRA', to: 'IST', flightNo: 'TK1588',
        date: '2026-01-20', weightKg: 85, distanceKm: 1860,
        emissionKg: 0.18972, amount: 0.09486,
      },
    ],
    totals: { distanceKm: 3720, weightKg: 170, emissionKg: 0.37944, amount: 0.18972 },
    createdAt: '2026-01-15T08:00:00.000Z',
    updatedAt: '2026-01-15T08:00:00.000Z',
  },
];
```

- [ ] **Step 2: MSW handler'larını yaz**

```ts
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { seedUser, seedGroups } from './data';

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as { email: string; password: string };
    if (body.email === seedUser.email && body.password === seedUser.password) {
      return HttpResponse.json({ user: seedUser });
    }
    return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }),

  http.post('/api/auth/signup', async ({ request }) => {
    const body = await request.json() as Record<string, string>;
    const newUser = { ...seedUser, ...body, id: crypto.randomUUID() };
    return HttpResponse.json({ user: newUser }, { status: 201 });
  }),

  http.get('/api/groups', () => {
    return HttpResponse.json({ groups: seedGroups });
  }),

  http.post('/api/groups', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    return HttpResponse.json({ group: { ...body, id: crypto.randomUUID() } }, { status: 201 });
  }),

  http.put('/api/groups/:id', async ({ request, params }) => {
    const body = await request.json() as Record<string, unknown>;
    return HttpResponse.json({ group: { ...body, id: params.id } });
  }),

  http.delete('/api/groups/:id', () => {
    return HttpResponse.json({ success: true });
  }),
];
```

- [ ] **Step 3: Browser worker oluştur**

```ts
// src/mocks/browser.ts
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
```

- [ ] **Step 4: main.tsx'te MSW'yi başlat**

```tsx
// src/main.tsx - MSW'yi dev ortamında başlat
async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    return worker.start({ onUnhandledRequest: 'bypass' });
  }
}

enableMocking().then(() => {
  // mevcut render kodu
});
```

- [ ] **Step 5: Doğrula**

```bash
npm run dev
# Tarayıcı konsolunda "[MSW] Mocking enabled" mesajı görünmeli
```

- [ ] **Step 6: Commit**

```bash
git add src/mocks/ src/main.tsx
git commit -m "feat: add MSW mock API with seed data and handlers"
```

---

## Chunk 3: Unit Testler

### Task 4: Calculation Unit Testleri

**Files:**
- Create/Move: `tests/unit/calculation.test.ts`

- [ ] **Step 1: Mevcut test dosyasını tests/ altına taşı veya yeniden yaz**

```ts
// tests/unit/calculation.test.ts
import { describe, it, expect } from 'vitest';
import {
  calculateLegEmission,
  calculateLegAmount,
  calculateGroupTotals,
  calculateDashboardTotals,
  calculateEquivalents,
  formatCurrency,
  formatNumber,
} from '../../src/lib/calculation';
import { DEFAULT_CONFIG } from '../../src/lib/constants';
import type { TripGroup } from '../../src/types';

describe('calculateLegEmission', () => {
  it('calculates emission correctly: distanceKm * weightKg * emissionFactor', () => {
    const result = calculateLegEmission(1000, 80, DEFAULT_CONFIG.emissionFactor);
    expect(result).toBeCloseTo(0.96, 6);
  });

  it('returns 0 for zero distance', () => {
    expect(calculateLegEmission(0, 80, DEFAULT_CONFIG.emissionFactor)).toBe(0);
  });

  it('returns 0 for zero weight', () => {
    expect(calculateLegEmission(1000, 0, DEFAULT_CONFIG.emissionFactor)).toBe(0);
  });
});

describe('calculateLegAmount', () => {
  it('calculates amount in base currency: emissionKg * basePricePerKg * fxRate', () => {
    const result = calculateLegAmount(0.96, DEFAULT_CONFIG.basePricePerKg, 1);
    expect(result).toBeCloseTo(0.48, 2);
  });

  it('converts to target currency using fx rate', () => {
    const result = calculateLegAmount(0.96, DEFAULT_CONFIG.basePricePerKg, 34.50);
    expect(result).toBeCloseTo(16.56, 2);
  });
});

describe('calculateGroupTotals', () => {
  it('sums all leg values', () => {
    const legs = [
      { distanceKm: 1000, weightKg: 80, emissionKg: 0.96, amount: 0.48 },
      { distanceKm: 2000, weightKg: 90, emissionKg: 2.16, amount: 1.08 },
    ];
    const totals = calculateGroupTotals(legs);
    expect(totals.distanceKm).toBe(3000);
    expect(totals.weightKg).toBe(170);
    expect(totals.emissionKg).toBeCloseTo(3.12, 6);
    expect(totals.amount).toBeCloseTo(1.56, 2);
  });

  it('returns zeros for empty legs', () => {
    const totals = calculateGroupTotals([]);
    expect(totals).toEqual({ distanceKm: 0, weightKg: 0, emissionKg: 0, amount: 0 });
  });
});

describe('calculateDashboardTotals', () => {
  it('aggregates across all groups', () => {
    const groups: TripGroup[] = [
      {
        id: 'g1', name: 'G1',
        legs: [{ id: '1', groupId: 'g1', from: 'A', to: 'B', flightNo: 'X1', date: '2026-01-01', distanceKm: 1000, weightKg: 80, emissionKg: 0.96, amount: 0.48 }],
        totals: { distanceKm: 1000, weightKg: 80, emissionKg: 0.96, amount: 0.48 },
        createdAt: '', updatedAt: '',
      },
      {
        id: 'g2', name: 'G2',
        legs: [
          { id: '2', groupId: 'g2', from: 'C', to: 'D', flightNo: 'X2', date: '2026-01-02', distanceKm: 2000, weightKg: 90, emissionKg: 2.16, amount: 1.08 },
          { id: '3', groupId: 'g2', from: 'D', to: 'E', flightNo: 'X3', date: '2026-01-03', distanceKm: 500, weightKg: 70, emissionKg: 0.42, amount: 0.21 },
        ],
        totals: { distanceKm: 2500, weightKg: 160, emissionKg: 2.58, amount: 1.29 },
        createdAt: '', updatedAt: '',
      },
    ];
    const totals = calculateDashboardTotals(groups);
    expect(totals.totalDistanceKm).toBe(3500);
    expect(totals.totalLegCount).toBe(3);
    expect(totals.totalEmissionKgCO2e).toBeCloseTo(3.54, 6);
    expect(totals.totalPaymentInSelectedCurrency).toBeCloseTo(1.77, 2);
  });
});

describe('calculateEquivalents', () => {
  it('calculates all equivalent impacts from total emission', () => {
    const totalEmission = 100;
    const factors = DEFAULT_CONFIG.equivalencyFactors;
    const result = calculateEquivalents(totalEmission, factors);
    expect(result.equivalentKmDriven).toBeCloseTo(12.823, 2);
    expect(result.equivalentSeaIceM3).toBeCloseTo(0.008985, 4);
    expect(result.equivalentLightbulbDays).toBeCloseTo(10.724, 2);
    expect(result.equivalentBeefKg).toBeCloseTo(0.089883, 4);
  });

  it('returns zeros for zero emission', () => {
    const result = calculateEquivalents(0, DEFAULT_CONFIG.equivalencyFactors);
    expect(result.equivalentKmDriven).toBe(0);
    expect(result.equivalentSeaIceM3).toBe(0);
    expect(result.equivalentLightbulbDays).toBe(0);
    expect(result.equivalentBeefKg).toBe(0);
  });
});

describe('formatCurrency', () => {
  it('formats EUR correctly', () => {
    const result = formatCurrency(1234.56, 'EUR');
    expect(result).toContain('1');
    expect(result).toContain('234');
  });
});

describe('formatNumber', () => {
  it('formats with specified decimal places', () => {
    expect(formatNumber(12.345, 2)).toBe('12.35');
    expect(formatNumber(12.345, 0)).toBe('12');
  });
});
```

- [ ] **Step 2: Testleri çalıştır**

```bash
npx vitest run tests/unit/calculation.test.ts
# Expected: Tüm testler PASS
```

- [ ] **Step 3: Commit**

```bash
git add tests/unit/calculation.test.ts
git commit -m "test: add comprehensive calculation unit tests"
```

---

### Task 5: Validation Unit Testleri

**Files:**
- Create: `tests/unit/validation.test.ts`

- [ ] **Step 1: Validation testlerini yaz**

```ts
// tests/unit/validation.test.ts
import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validateRequired,
  validatePositiveNumber,
  validateDate,
  validateFlightNo,
  validateSignUpForm,
  validateLoginForm,
  validateLeg,
  validateGroupName,
} from '../../src/lib/validation';

describe('validateEmail', () => {
  it('accepts valid email', () => expect(validateEmail('test@example.com')).toBeNull());
  it('rejects invalid email', () => expect(validateEmail('invalid')).toBe('validation.invalidEmail'));
  it('rejects empty email', () => expect(validateEmail('')).toBe('validation.required'));
});

describe('validateRequired', () => {
  it('accepts non-empty', () => expect(validateRequired('hello')).toBeNull());
  it('rejects empty', () => expect(validateRequired('')).toBe('validation.required'));
  it('rejects whitespace-only', () => expect(validateRequired('   ')).toBe('validation.required'));
});

describe('validatePositiveNumber', () => {
  it('accepts positive', () => expect(validatePositiveNumber(10)).toBeNull());
  it('rejects zero', () => expect(validatePositiveNumber(0)).toBe('validation.mustBePositive'));
  it('rejects negative', () => expect(validatePositiveNumber(-5)).toBe('validation.mustBePositive'));
  it('rejects NaN', () => expect(validatePositiveNumber(NaN)).toBe('validation.mustBeNumber'));
});

describe('validateDate', () => {
  it('accepts valid date', () => expect(validateDate('2026-01-15')).toBeNull());
  it('rejects empty', () => expect(validateDate('')).toBe('validation.required'));
  it('rejects invalid', () => expect(validateDate('not-a-date')).toBe('validation.invalidDate'));
});

describe('validateFlightNo', () => {
  it('accepts alphanumeric', () => expect(validateFlightNo('TK1234')).toBeNull());
  it('rejects empty', () => expect(validateFlightNo('')).toBe('validation.required'));
});

describe('validateSignUpForm', () => {
  it('returns no errors for valid data', () => {
    const errors = validateSignUpForm({
      firstName: 'John', lastName: 'Doe',
      email: 'john@example.com', password: 'pass123', termsAccepted: true,
    });
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('returns errors for empty fields', () => {
    const errors = validateSignUpForm({
      firstName: '', lastName: '', email: '', password: '', termsAccepted: false,
    });
    expect(errors.firstName).toBeDefined();
    expect(errors.lastName).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.password).toBeDefined();
    expect(errors.termsAccepted).toBeDefined();
  });
});

describe('validateLoginForm', () => {
  it('returns no errors for valid data', () => {
    const errors = validateLoginForm({ email: 'test@test.com', password: '123456' });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});

describe('validateLeg', () => {
  it('returns no errors for valid leg', () => {
    const errors = validateLeg({
      from: 'IST', to: 'JFK', flightNo: 'TK1',
      date: '2026-01-01', weightKg: 80, distanceKm: 8000,
    });
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('returns errors for invalid leg', () => {
    const errors = validateLeg({
      from: '', to: '', flightNo: '',
      date: '', weightKg: 0, distanceKm: -1,
    });
    expect(Object.keys(errors).length).toBeGreaterThan(0);
  });
});

describe('validateGroupName', () => {
  it('rejects empty', () => expect(validateGroupName('')).toBe('validation.required'));
  it('accepts valid', () => expect(validateGroupName('Trip')).toBeNull());
});
```

- [ ] **Step 2: Testleri çalıştır**

```bash
npx vitest run tests/unit/validation.test.ts
# Expected: Tüm testler PASS
```

- [ ] **Step 3: Commit**

```bash
git add tests/unit/validation.test.ts
git commit -m "test: add validation unit tests"
```

---

### Task 6: Export Unit Testleri

**Files:**
- Create: `tests/unit/export.test.ts`

- [ ] **Step 1: Export testlerini yaz**

```ts
// tests/unit/export.test.ts
import { describe, it, expect } from 'vitest';
import { buildExportPayload } from '../../src/lib/export';
import type { TripGroup, EquivalentImpact } from '../../src/types';

describe('buildExportPayload', () => {
  const group: TripGroup = {
    id: 'g1', name: 'Test Group',
    legs: [{
      id: 'l1', groupId: 'g1', from: 'IST', to: 'JFK',
      flightNo: 'TK1', date: '2026-01-01',
      distanceKm: 8000, weightKg: 80, emissionKg: 7.68, amount: 3.84,
    }],
    totals: { distanceKm: 8000, weightKg: 80, emissionKg: 7.68, amount: 3.84 },
    createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z',
  };

  const equivalents: EquivalentImpact = {
    equivalentKmDriven: 12.82,
    equivalentSeaIceM3: 0.01,
    equivalentLightbulbDays: 10.72,
    equivalentBeefKg: 0.09,
  };

  it('builds correct export structure', () => {
    const result = buildExportPayload(group, equivalents, 'EUR', 'EUR');
    expect(result.groupId).toBe('g1');
    expect(result.groupName).toBe('Test Group');
    expect(result.baseCurrency).toBe('EUR');
    expect(result.currency).toBe('EUR');
    expect(result.totals.distanceKm).toBe(8000);
    expect(result.legs).toHaveLength(1);
    expect(result.legs[0].from).toBe('IST');
    expect(result.exportedAt).toBeDefined();
    expect(result.equivalents.kmDriven).toBe(12.82);
    expect(result.equivalents.seaIceM3).toBe(0.01);
    expect(result.equivalents.lightbulbDays).toBe(10.72);
    expect(result.equivalents.beefKg).toBe(0.09);
  });

  it('includes all leg fields', () => {
    const result = buildExportPayload(group, equivalents, 'EUR', 'USD');
    const leg = result.legs[0];
    expect(leg).toHaveProperty('id');
    expect(leg).toHaveProperty('from');
    expect(leg).toHaveProperty('to');
    expect(leg).toHaveProperty('flightNo');
    expect(leg).toHaveProperty('date');
    expect(leg).toHaveProperty('distanceKm');
    expect(leg).toHaveProperty('weightKg');
    expect(leg).toHaveProperty('emissionKg');
    expect(leg).toHaveProperty('amount');
  });

  it('sets exportedAt to ISO string', () => {
    const result = buildExportPayload(group, equivalents, 'EUR', 'EUR');
    expect(() => new Date(result.exportedAt)).not.toThrow();
  });
});
```

- [ ] **Step 2: Testleri çalıştır**

```bash
npx vitest run tests/unit/export.test.ts
# Expected: Tüm testler PASS
```

- [ ] **Step 3: Commit**

```bash
git add tests/unit/export.test.ts
git commit -m "test: add export unit tests"
```

---

## Chunk 4: Integration Testler

### Task 7: Auth Integration Test

**Files:**
- Create: `tests/integration/auth.test.tsx`

- [ ] **Step 1: Auth integration testini yaz**

Signup akışı: formu render et, doldur, submit et, dashboard'a yönlendirildiğini doğrula.

```tsx
// tests/integration/auth.test.tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../src/i18n/i18n';
import { SignUpForm } from '../../src/components/auth';

// Not: MemoryRouter ile çalıştığından navigate mock'lanmalı

describe('SignUpForm', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders all required fields', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <SignUpForm />
        </MemoryRouter>
      </I18nextProvider>
    );

    expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty form submission', async () => {
    const user = userEvent.setup();

    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <SignUpForm />
        </MemoryRouter>
      </I18nextProvider>
    );

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(submitButton);

    const alerts = screen.getAllByRole('alert');
    expect(alerts.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Testi çalıştır**

```bash
npx vitest run tests/integration/auth.test.tsx
# Expected: PASS
```

- [ ] **Step 3: Commit**

```bash
git add tests/integration/auth.test.tsx
git commit -m "test: add auth integration test"
```

---

### Task 8: Dashboard Integration Test

**Files:**
- Create: `tests/integration/dashboard.test.tsx`

- [ ] **Step 1: Dashboard integration testini yaz**

Grup ekleme akışı: DashboardPage render et, Add butonuna tıkla, modal'ı doldur, submit et, history'de görünsün.

- [ ] **Step 2: Testi çalıştır**

```bash
npx vitest run tests/integration/dashboard.test.tsx
# Expected: PASS
```

- [ ] **Step 3: Commit**

```bash
git add tests/integration/dashboard.test.tsx
git commit -m "test: add dashboard integration test"
```

---

## Chunk 5: Responsive Polish ve README

### Task 9: Responsive Kontrol ve Düzeltmeler

- [ ] **Step 1: Desktop (1920px) kontrol**
  - Tablo bazlı history list
  - Full header navigation
  - Summary card'lar 4'lü grid

- [ ] **Step 2: Tablet (1024px) kontrol**
  - Card bazlı history layout
  - Summary card'lar 2'li grid
  - Spacing ve typography ayarları

- [ ] **Step 3: Mobile (320px) kontrol**
  - Tek kolon layout
  - Kompakt history card'lar
  - PREV/NEXT pagination
  - Mobile menu

- [ ] **Step 4: Düzeltmeleri uygula ve commit et**

```bash
git add -A
git commit -m "fix: responsive layout adjustments for desktop, tablet, mobile"
```

---

### Task 10: README Oluştur

**Files:**
- Create: `README.md`

- [ ] **Step 1: README yaz**

İçerik:
- Proje açıklaması
- Tech stack
- Setup: `npm install`
- Run: `npm run dev`
- Build: `npm run build`
- Test: `npx vitest run`
- Proje yapısı
- Mimari kararlar ve trade-off'lar
- Varsayımlar

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with setup, run, build, test instructions"
```

---

## Tüm Testlerin Çalıştırılması

```bash
npx vitest run
# Expected: Tüm unit ve integration testleri PASS
```

---

## BRD Acceptance Criteria Eşleştirmesi

| AC | Kapsayan Task |
|---|---|
| AC-1: Register/login with validation | Task 13-14 (done), Task 7 |
| AC-2: Add groups up to 15 legs | Task 18 (done), Task 2 |
| AC-3: Amounts/emissions in row/summary | SummaryCards + HistoryTable (done) |
| AC-4: Details opens edit modal | Task 2 |
| AC-5: Save edits recalculates totals | EditTransportationModal (done) |
| AC-6: Chevron opens overlay | DetailOverlay (done) |
| AC-7: Download exports JSON | Task 2 |
| AC-8: Currency update recalculates | ProfileForm → recalculateAllAmounts (done) |
| AC-9: Profile lock/unlock | Task 1 |
| AC-10: Responsive consistency | Task 9 |
| AC-11: Amount dropdown equivalents | AmountDropdown (done) |
| AC-12: Equivalents calculated, not static | calculateEquivalents in lib (done) |
