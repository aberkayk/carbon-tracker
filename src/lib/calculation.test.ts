import { describe, it, expect } from "vitest";
import {
  calculateLegEmission,
  calculateLegAmount,
  calculateGroupTotals,
  calculateDashboardTotals,
  calculateEquivalents,
  formatNumber,
  formatCurrency,
} from "./calculation";
import { DEFAULT_CONFIG } from "./constants";
import type { TripGroup } from "../types";

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

describe("calculateDashboardTotals", () => {
  const makeGroup = (
    emissionKg: number,
    distanceKm: number,
    legCount: number,
    amount: number,
  ): TripGroup => ({
    id: "g1",
    name: "Test",
    legs: Array.from({ length: legCount }, (_, i) => ({
      id: `l${i}`,
      groupId: "g1",
      from: "A",
      to: "B",
      flightNo: "XX1",
      date: "2026-01-01",
      weightKg: 80,
      distanceKm: distanceKm / legCount,
      emissionKg: emissionKg / legCount,
      amount: amount / legCount,
    })),
    totals: { distanceKm, weightKg: 80, emissionKg, amount },
    createdAt: "",
    updatedAt: "",
  });

  it("should sum totals across all groups", () => {
    const groups = [makeGroup(10, 1000, 2, 5), makeGroup(20, 2000, 3, 10)];
    const totals = calculateDashboardTotals(groups);
    expect(totals.totalEmissionKgCO2e).toBe(30);
    expect(totals.totalDistanceKm).toBe(3000);
    expect(totals.totalLegCount).toBe(5);
    expect(totals.totalPaymentInSelectedCurrency).toBe(15);
  });

  it("should return zeros for empty groups array", () => {
    const totals = calculateDashboardTotals([]);
    expect(totals.totalEmissionKgCO2e).toBe(0);
    expect(totals.totalDistanceKm).toBe(0);
    expect(totals.totalLegCount).toBe(0);
    expect(totals.totalPaymentInSelectedCurrency).toBe(0);
  });
});

describe("formatNumber", () => {
  it("should format number with given decimals", () => {
    expect(formatNumber(1234.567, 2)).toMatch(/1[,.]234[.,]57/);
  });

  it("should format integer with 0 decimals", () => {
    expect(formatNumber(1234, 0)).toMatch(/1[,.]234|1234/);
  });
});

describe("formatCurrency", () => {
  it("should include currency symbol for EUR", () => {
    const result = formatCurrency(100, "EUR");
    expect(result).toMatch(/€|EUR/);
    expect(result).toMatch(/100/);
  });

  it("should format with 2 decimal places", () => {
    const result = formatCurrency(9.5, "USD");
    expect(result).toMatch(/9[.,]50/);
  });
});
