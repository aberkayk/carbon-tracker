import type {
  TripGroup,
  TripLeg,
  DashboardTotals,
  EquivalentImpact,
} from "../types";

export function calculateLegEmission(
  distanceKm: number,
  weightKg: number,
  emissionFactor: number,
): number {
  return distanceKm * weightKg * emissionFactor;
}

export function calculateLegAmount(
  emissionKg: number,
  basePricePerKg: number,
  fxRate: number,
): number {
  return emissionKg * basePricePerKg * fxRate;
}

export function calculateGroupTotals(
  legs: Pick<TripLeg, "distanceKm" | "weightKg" | "emissionKg" | "amount">[],
): TripGroup["totals"] {
  return legs.reduce(
    (acc, leg) => ({
      distanceKm: acc.distanceKm + leg.distanceKm,
      weightKg: acc.weightKg + leg.weightKg,
      emissionKg: acc.emissionKg + leg.emissionKg,
      amount: acc.amount + leg.amount,
    }),
    { distanceKm: 0, weightKg: 0, emissionKg: 0, amount: 0 },
  );
}

export function calculateDashboardTotals(groups: TripGroup[]): DashboardTotals {
  return groups.reduce(
    (acc, group) => ({
      totalEmissionKgCO2e: acc.totalEmissionKgCO2e + group.totals.emissionKg,
      totalDistanceKm: acc.totalDistanceKm + group.totals.distanceKm,
      totalLegCount: acc.totalLegCount + group.legs.length,
      totalPaymentInSelectedCurrency:
        acc.totalPaymentInSelectedCurrency + group.totals.amount,
    }),
    {
      totalEmissionKgCO2e: 0,
      totalDistanceKm: 0,
      totalLegCount: 0,
      totalPaymentInSelectedCurrency: 0,
    },
  );
}

export function calculateEquivalents(
  totalEmissionKgCO2e: number,
  factors: {
    kmDrivenPerKgCo2e: number;
    seaIceM3PerKgCo2e: number;
    lightbulbDaysPerKgCo2e: number;
    beefKgPerKgCo2e: number;
  },
): EquivalentImpact {
  return {
    equivalentKmDriven: totalEmissionKgCO2e * factors.kmDrivenPerKgCo2e,
    equivalentSeaIceM3: totalEmissionKgCO2e * factors.seaIceM3PerKgCo2e,
    equivalentLightbulbDays:
      totalEmissionKgCO2e * factors.lightbulbDaysPerKgCo2e,
    equivalentBeefKg: totalEmissionKgCO2e * factors.beefKgPerKgCo2e,
  };
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(value: number, decimals: number): string {
  return value.toFixed(decimals);
}
