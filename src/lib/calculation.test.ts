import { describe, it, expect } from "vitest";
import {
  calculateLegEmission,
  calculateLegAmount,
  calculateGroupTotals,
  calculateEquivalents,
} from "./calculation";
import { DEFAULT_CONFIG } from "./constants";

describe("Calculation Logic", () => {
  it("should calculate leg emission correctly", () => {
    const distanceKm = 1000;
    const weightKg = 100;
    const factor = 0.000012;
    const expected = 1.2; // 1000 * 100 * 0.000012
    expect(calculateLegEmission(distanceKm, weightKg, factor)).toBe(expected);
  });

  it("should calculate leg amount correctly", () => {
    const emissionKg = 1.2;
    const pricePerKg = 0.5;
    const fxRate = 34.5; // TRY rate
    const expected = 1.2 * 0.5 * 34.5;
    expect(calculateLegAmount(emissionKg, pricePerKg, fxRate)).toBe(expected);
  });

  it("should calculate group totals correctly", () => {
    const legs = [
      { distanceKm: 1000, weightKg: 100, emissionKg: 1.2, amount: 20 },
      { distanceKm: 500, weightKg: 200, emissionKg: 1.2, amount: 20 },
    ];
    const totals = calculateGroupTotals(legs);
    expect(totals.distanceKm).toBe(1500);
    expect(totals.weightKg).toBe(300);
    expect(totals.emissionKg).toBe(2.4);
    expect(totals.amount).toBe(40);
  });

  it("should calculate equivalent impacts correctly", () => {
    const totalEmission = 100;
    const factors = DEFAULT_CONFIG.equivalencyFactors;
    const impacts = calculateEquivalents(totalEmission, factors);

    expect(impacts.equivalentKmDriven).toBe(
      totalEmission * factors.kmDrivenPerKgCo2e,
    );
    expect(impacts.equivalentSeaIceM3).toBe(
      totalEmission * factors.seaIceM3PerKgCo2e,
    );
    expect(impacts.equivalentLightbulbDays).toBe(
      totalEmission * factors.lightbulbDaysPerKgCo2e,
    );
    expect(impacts.equivalentBeefKg).toBe(
      totalEmission * factors.beefKgPerKgCo2e,
    );
  });
});
