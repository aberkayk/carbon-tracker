export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  currency: string;
  language: string;
  notificationOptIn: boolean;
  social: {
    googleConnected: boolean;
    facebookConnected: boolean;
  };
}

export interface TripLeg {
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

export interface TripGroup {
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

export interface CalculationConfig {
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

export interface EquivalentImpact {
  equivalentKmDriven: number;
  equivalentSeaIceM3: number;
  equivalentLightbulbDays: number;
  equivalentBeefKg: number;
}

export interface ExportPayload {
  groupId: string;
  groupName: string;
  baseCurrency: string;
  currency: string;
  totals: {
    distanceKm: number;
    weightKg: number;
    emissionKg: number;
    amount: number;
  };
  equivalents: {
    kmDriven: number;
    seaIceM3: number;
    lightbulbDays: number;
    beefKg: number;
  };
  legs: Array<{
    id: string;
    from: string;
    to: string;
    flightNo: string;
    date: string;
    distanceKm: number;
    weightKg: number;
    emissionKg: number;
    amount: number;
  }>;
  exportedAt: string;
}

export interface DashboardTotals {
  totalEmissionKgCO2e: number;
  totalDistanceKm: number;
  totalLegCount: number;
  totalPaymentInSelectedCurrency: number;
}
