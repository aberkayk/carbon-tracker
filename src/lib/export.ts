import type { TripGroup, ExportPayload } from "../types";
import { DEFAULT_CONFIG } from "./constants";
import { calculateEquivalents } from "./calculation";

export function exportGroupToJson(group: TripGroup, currency: string) {
  const equivalents = calculateEquivalents(
    group.totals.emissionKg,
    DEFAULT_CONFIG.equivalencyFactors,
  );

  const payload: ExportPayload = {
    groupId: group.id,
    groupName: group.name,
    baseCurrency: DEFAULT_CONFIG.baseCurrency,
    currency: currency,
    totals: {
      distanceKm: group.totals.distanceKm,
      weightKg: group.totals.weightKg,
      emissionKg: group.totals.emissionKg,
      amount: group.totals.amount,
    },
    equivalents: {
      kmDriven: equivalents.equivalentKmDriven,
      seaIceM3: equivalents.equivalentSeaIceM3,
      lightbulbDays: equivalents.equivalentLightbulbDays,
      beefKg: equivalents.equivalentBeefKg,
    },
    legs: group.legs.map((leg) => ({
      id: leg.id,
      from: leg.from,
      to: leg.to,
      flightNo: leg.flightNo,
      date: leg.date,
      distanceKm: leg.distanceKm,
      weightKg: leg.weightKg,
      emissionKg: leg.emissionKg,
      amount: leg.amount,
    })),
    exportedAt: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${group.name.replace(/\s+/g, "_")}_export.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
