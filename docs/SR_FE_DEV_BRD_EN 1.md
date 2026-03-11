# Climateware Carbon Travel Tracker - Business Requirements Document

## 1. Document Control
- Product Name: Climateware Carbon Travel Tracker
- Document Type: Business Requirements Document (BRD)
- Version: 2.0
- Date: 2026-02-11
- Source of Truth for UI and interaction details: Figma file `ttptKCMGMKDnVtU0Yo2J7f`

## 2. Executive Summary
Climateware Carbon Travel Tracker is a web product that enables authenticated users to record flight transportation data, calculate carbon emissions, convert those emissions into monetary offset values, and review/export those results.

The product covers full user flow from authentication to transportation data management, emission analytics, and account preferences. It must provide consistent behavior across desktop, tablet, and mobile breakpoints.

## 3. Business Context
Organizations and individual users need a practical way to understand and communicate travel-related carbon impact. Existing manual workflows are error-prone and do not produce consistent, exportable records.

This product addresses that gap by:
- standardizing trip and leg input,
- applying transparent calculation logic,
- producing summary metrics and detailed records,
- supporting data portability through JSON export.

## 4. Business Objectives
- BO-1: Enable users to register, authenticate, and manage profile preferences securely.
- BO-2: Provide accurate and auditable emission and offset calculations for flight groups.
- BO-3: Reduce manual reporting time via automatic summaries and downloadable structured output.
- BO-4: Deliver a responsive multi-device user experience aligned with approved design assets.

## 5. Success Metrics (Post-Launch)
- SM-1: At least 90% of created flight groups contain valid and complete leg data.
- SM-2: Less than 2% calculation mismatch incidents reported by QA/support.
- SM-3: At least 40% of active users use JSON export within first 30 days.
- SM-4: Responsive UX parity issues under 5 critical defects per release.

## 6. Scope Definition

### 6.1 In Scope
- User registration and login flows.
- Optional social sign-in entry points in UI.
- Profile management with locked/unlocked edit states.
- Language selection and profile action menus.
- Transportation group creation with dynamic leg rows.
- Emission and monetary calculations using configurable constants.
- Amount card equivalent-impact calculations derived from total kgCO2e.
- Dashboard summaries, history listing, edit modal via Details action, detail overlay/panel via chevron action, and JSON download.
- Responsive behavior for desktop (`1920`), tablet (`1024`), mobile (`320`).

### 6.2 Out of Scope
- Payment collection or checkout processing.
- Mandatory external OAuth production integration.
- Regulatory carbon certification workflows.
- Multi-tenant admin panel.

## 7. Users and Personas
- Primary Persona: Sustainability analyst entering and exporting transportation impact data.
- Secondary Persona: Operations user maintaining travel records and reviewing aggregate totals.

## 8. End-to-End User Journey
1. User creates account (or logs in).
2. User lands on dashboard and sees current summary metrics.
3. User opens Add Transportation modal.
4. User enters group name and one or more leg records.
5. System validates input and saves the group.
6. System recalculates summary cards and row totals.
7. User clicks Details and opens the edit modal for the selected group.
8. User clicks chevron on a row and opens the detail overlay/panel.
9. User downloads selected dataset via Download action (JSON).
10. User updates profile settings (currency/language/notification/social links).

## 9. Functional Requirements

## 9.1 Authentication and Session
- `FR-AUTH-01`: System shall provide Sign Up form with First Name, Last Name, Email, Password, Terms confirmation.
- `FR-AUTH-02`: Terms confirmation shall be required before account creation.
- `FR-AUTH-03`: System shall provide Login form with Email and Password.
- `FR-AUTH-04`: Password fields shall support visibility toggle.
- `FR-AUTH-05`: Auth screens shall include Google and Facebook action buttons as optional entry points.
- `FR-AUTH-06`: User shall be redirected to Dashboard upon successful login.
- `FR-AUTH-07`: Form validation shall enforce required fields and valid email format.
- `FR-AUTH-08`: Error states shall be shown with clear user-facing messages.

## 9.2 Profile Management
- `FR-PROF-01`: Profile screen shall open in locked mode by default.
- `FR-PROF-02`: Locked mode shall display `Edit` action and lock icon.
- `FR-PROF-03`: Edit action shall open `Edit Account?` modal requiring password confirmation.
- `FR-PROF-04`: Successful confirmation shall switch profile to unlocked mode.
- `FR-PROF-05`: Unlocked mode shall display `Save` action and unlock icon.
- `FR-PROF-06`: Editable profile fields shall include first name, last name, email, password, currency.
- `FR-PROF-07`: Currency selection shall impact all monetary displays in dashboard and item rows.
- `FR-PROF-08`: Notification preference checkbox state shall be persisted.
- `FR-PROF-09`: Social connect/disconnect actions shall update local user connection state.
- `FR-PROF-10`: Header profile menu shall include `Profile`, `Dashboard`, `Logout`.

## 9.3 Dashboard and History
- `FR-DASH-01`: Dashboard shall show welcome title and descriptive helper text.
- `FR-DASH-02`: Dashboard shall include `Share Statistics` entry point.
- `FR-DASH-03`: Dashboard shall display four summary metrics: Amount, Distance, Total Transportation, Payment.
- `FR-DASH-04`: Amount card shall support expanded informational dropdown state.
- `FR-DASH-05`: History section shall list transportation groups with amount/distance/weight values.
- `FR-DASH-06`: Each history row shall provide `Download` and `Details` actions.
- `FR-DASH-07`: Chevron action on each row shall open/close a detail overlay/panel.
- `FR-DASH-08`: Detail overlay/panel shall display nested leg-level values (Date, From, To, Flight No, Distance, Weight).
- `FR-DASH-09`: Pagination shall be available for history data.
- `FR-DASH-10`: `Add` action shall open Add Transportation modal.
- `FR-DASH-11`: Amount dropdown shall display equivalent-impact metrics calculated from total emission (`totalEmissionKgCO2e`).
- `FR-DASH-12`: Required equivalent-impact metric set is:
  - `equivalentKmDriven` => UI: `km driven`, unit: `km`
  - `equivalentSeaIceM3` => UI: `sea ice melt`, unit: `m3`
  - `equivalentLightbulbDays` => UI: `lightbulb usage`, unit: `days`
  - `equivalentBeefKg` => UI: `beef consumption`, unit: `kg`
- `FR-DASH-13`: Equivalent-impact values shall update whenever total emission changes.
- `FR-DASH-14`: Equivalent-impact values shall be algorithmically calculated from total kgCO2e; hardcoded placeholder values are not acceptable.
- `FR-DASH-15`: Summary card metric mapping shall be:
  - `Amount = totalEmissionKgCO2e` (unit: `kgCO2e`)
  - `Distance = totalDistanceKm` (unit: `km`)
  - `Total Transportation = totalLegCount` (unit: `count`)
  - `Payment = totalPaymentInSelectedCurrency` (unit: selected currency)
- `FR-DASH-16`: History row metric mapping shall be:
  - `Distance = groupDistanceKm` (unit: `km`)
  - `Weight = groupWeightKg` (unit: `kg`)
  - `Amount = groupPaymentInSelectedCurrency` (unit: selected currency)
- `FR-DASH-17`: UI shall display metric units consistently (`kgCO2e`, `km`, `kg`, currency symbol).

## 9.4 Add Transportation Data
- `FR-MOD-01`: Modal title shall be `Add Transportation Data`.
- `FR-MOD-02`: Modal shall include group-level `Name` field.
- `FR-MOD-03`: Modal shall support dynamic leg rows with fields: From, To, Flight No, Date, Weight, Distance.
- `FR-MOD-04`: Date field shall support date input/picker behavior.
- `FR-MOD-05`: User shall be able to add new rows using plus action.
- `FR-MOD-06`: User shall be able to remove rows using cross action.
- `FR-MOD-07`: Maximum leg row count per group shall be 15.
- `FR-MOD-08`: System shall block add action beyond 15 and show informative warning.
- `FR-MOD-09`: Cancel shall close modal without persisting changes.
- `FR-MOD-10`: Add shall validate and persist group plus legs.

## 9.5 Edit Modal, Detail Overlay, and Export
- `FR-DET-01`: Details action shall open an edit modal for the selected group.
- `FR-DET-02`: Edit modal shall load existing group and leg data and allow updates.
- `FR-DET-03`: Saving edit modal changes shall recalculate totals and refresh dashboard values.
- `FR-OVR-01`: Chevron action shall open a detail overlay/panel for the selected group.
- `FR-OVR-02`: Overlay shall render each leg with from/to/date/flightNo/distance/weight fields.
- `FR-OVR-03`: Overlay shall support explicit close/collapse action.
- `FR-EXP-01`: Download action shall export selected group data in JSON format.
- `FR-EXP-02`: Export payload shall include group metadata, leg list, totals, currency, export timestamp.

## 9.6 Navigation and Language
- `FR-NAV-01`: Top-level language selector shall support at minimum English and Turkish.
- `FR-NAV-02`: Active language shall be visually distinct.
- `FR-NAV-03`: Mobile menu shall expose WEB/TABLET/MOBILE links and profile actions.
- `FR-NAV-04`: Header action menus shall be usable via pointer and keyboard interaction.

## 10. Business Rules

## 10.1 Data Entry Rules
- `BR-01`: Group name is mandatory.
- `BR-02`: All leg fields are mandatory.
- `BR-03`: Distance and weight must be numeric and greater than zero.
- `BR-04`: Date must be valid.
- `BR-05`: Flight number accepts alphanumeric values.

## 10.2 Calculation Rules
Calculation must be deterministic and configuration-driven.

- `itemEmissionKg = distanceKm * weightKg * emissionFactor`
- `itemAmountBaseCurrency = itemEmissionKg * basePricePerKg`
- `itemAmountInCurrency = itemAmountBaseCurrency * fxRate(baseCurrency, selectedCurrency)`
- `totalEmissionKgCO2e = sum(itemEmissionKg)`
- `totalDistanceKm = sum(distanceKm)`
- `totalLegCount = count(allLegs)`
- `totalPaymentInSelectedCurrency = sum(itemAmountInCurrency)`
- `groupDistanceKm = sum(groupLeg.distanceKm)`
- `groupWeightKg = sum(groupLeg.weightKg)`
- `groupPaymentInSelectedCurrency = sum(groupLeg.itemAmountInCurrency)`

Amount card equivalent-impact formulas (based on total emission):
- `equivalentKmDriven = totalEmissionKgCO2e * kmDrivenPerKgCo2e`
- `equivalentSeaIceM3 = totalEmissionKgCO2e * seaIceM3PerKgCo2e`
- `equivalentLightbulbDays = totalEmissionKgCO2e * lightbulbDaysPerKgCo2e`
- `equivalentBeefKg = totalEmissionKgCO2e * beefKgPerKgCo2e`

Defaults:
- `baseCurrency = EUR`
- `basePricePerKg = 0.50` (defined in `baseCurrency`, i.e., `0.50 EUR` per kgCO2e)
- `emissionFactor = 0.000012` (kgCO2e per `kg * km`)
- `fxRate = configurable conversion map from baseCurrency to target currency`
- `kmDrivenPerKgCo2e = 0.12823`
- `seaIceM3PerKgCo2e = 0.00008985`
- `lightbulbDaysPerKgCo2e = 0.10724`
- `beefKgPerKgCo2e = 0.00089883`

Aggregation rules:
- Group totals are sum of group legs.
- Dashboard totals are sum of all groups.

Formatting rules:
- Amount values: 2 decimals.
- Distance and weight: normalized decimal rendering.
- Currency symbol and thousands/decimal separators must align with selected locale/currency.
- Amount card (`totalEmissionKgCO2e`) shall be rendered with `kgCO2e` unit.
- Payment values shall be rendered with selected currency symbol/code.
- Equivalent-impact rounding/display shall be:
  - `km driven`: `0` decimals (unit: `km`)
  - `sea ice melt`: `2` decimals (unit: `m3`)
  - `lightbulb usage`: `0` decimals (unit: `days`)
  - `beef consumption`: `2` decimals (unit: `kg`)

## 11. Data Model Requirements

```ts
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordMasked: string;
  currency: string;
  language: string;
  notificationOptIn: boolean;
  social: {
    googleConnected: boolean;
    facebookConnected: boolean;
  };
}

interface TripLeg {
  id: string;
  groupId: string;
  from: string;
  to: string;
  flightNo: string;
  date: string;
  weightKg: number;
  distanceKm: number;
  emissionKg: number;
  amount: number;
}

interface TripGroup {
  id: string;
  name: string;
  legs: TripLeg[];
  totals: {
    distanceKm: number;
    weightKg: number;
    emissionKg: number;
    amount: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface CalculationConfig {
  baseCurrency: string;
  basePricePerKg: number;
  emissionFactor: number;
  fxRates: Record<string, number>;
  equivalencyFactors: {
    kmDrivenPerKgCo2e: number;
    seaIceM3PerKgCo2e: number;
    lightbulbDaysPerKgCo2e: number;
    beefKgPerKgCo2e: number;
  };
}
```

## 12. Non-Functional Requirements

## 12.1 Performance
- `NFR-P-01`: Primary interactions (open add/edit modal, chevron overlay view, pagination) shall complete without perceptible lag on standard datasets.
- `NFR-P-02`: Recalculation after create/update operations shall complete within normal interactive expectations.

## 12.2 Reliability
- `NFR-R-01`: Invalid input shall never produce persisted malformed records.
- `NFR-R-02`: Calculation failures shall produce explicit error state and prevent corrupted totals.

## 12.3 Usability and Accessibility
- `NFR-UX-01`: All form controls shall have labels and clear validation feedback.
- `NFR-UX-02`: Icon-only controls shall expose accessible names.
- `NFR-UX-03`: Modal focus management and keyboard navigation are required.

## 12.4 Maintainability
- `NFR-M-01`: Calculation logic shall be isolated from UI rendering layer.
- `NFR-M-02`: State transitions shall be deterministic and testable.

## 13. Responsive Experience Requirements

### Desktop (1920)
- Table-oriented dashboard list.
- Chevron-triggered detail overlay/panel.
- Full header navigation and account actions.

### Tablet (1024)
- Card-based history layout with equivalent actions.
- Preserved summary card hierarchy.
- Adjusted spacing and typography while retaining same functional depth.

### Mobile (320)
- Stacked single-column auth/profile/dashboard patterns.
- Compact history cards and action buttons.
- PREV/NEXT style pagination with total context.
- Overlay-based menu and language picker.

## 14. External Interfaces and Export Contract
JSON export minimum structure:

```json
{
  "groupId": "string",
  "groupName": "string",
  "baseCurrency": "EUR",
  "currency": "EUR",
  "totals": {
    "distanceKm": 0,
    "weightKg": 0,
    "emissionKg": 0,
    "amount": 0
  },
  "equivalents": {
    "kmDriven": 0,
    "seaIceM3": 0,
    "lightbulbDays": 0,
    "beefKg": 0
  },
  "legs": [
    {
      "id": "string",
      "from": "string",
      "to": "string",
      "flightNo": "string",
      "date": "2026-02-11",
      "distanceKm": 0,
      "weightKg": 0,
      "emissionKg": 0,
      "amount": 0
    }
  ],
  "exportedAt": "2026-02-11T12:00:00.000Z"
}
```

## 15. Acceptance Criteria
- AC-1: User can complete register and login flows with validation.
- AC-2: User can add transportation groups and up to 15 legs per group.
- AC-3: Calculated amounts and emissions are shown in row and summary contexts.
- AC-4: Details action opens edit modal with pre-filled group/leg data.
- AC-5: User can save edits from modal and dashboard totals are recalculated.
- AC-6: Chevron action opens overlay/panel with leg-level data.
- AC-7: Download action exports valid JSON payload.
- AC-8: Currency update recalculates all monetary values.
- AC-9: Profile lock/unlock flow enforces confirmation behavior.
- AC-10: Product behavior and structure remain consistent across desktop, tablet, mobile breakpoints.
- AC-11: Amount dropdown displays equivalent-impact metrics calculated from total kgCO2e with configured factors and formatting rules.
- AC-12: Amount dropdown values are generated by calculation logic and are not static placeholder text.

## 16. Risks and Mitigations
- RSK-1: Misaligned formula interpretation.
- Mitigation: Keep formula and constants centralized in configuration.
- RSK-2: Inconsistent formatting across currencies/locales.
- Mitigation: Use locale-aware formatting utilities and test matrix.
- RSK-3: Responsive divergence from design.
- Mitigation: Breakpoint-level QA checklist based on Figma frames.

## 17. Assumptions and Dependencies
- ASSUMP-1: Figma structure and interaction patterns are approved for implementation.
- ASSUMP-2: Required constants (`baseCurrency`, `basePricePerKg`, `emissionFactor`, `fxRates`, `equivalencyFactors`) are available at runtime.
- ASSUMP-3: Social login may remain UI-level unless integration credentials are provided.

## 18. Release Readiness Checklist
- RR-1: All functional requirements pass acceptance tests.
- RR-2: Cross-device responsive QA completed.
- RR-3: JSON export validated against schema.
- RR-4: Error and empty states verified.
- RR-5: Accessibility smoke checks completed.
