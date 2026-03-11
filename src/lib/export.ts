import type { TripGroup, EquivalentImpact, ExportPayload } from "../types";

export function buildExportPayload(
  group: TripGroup,
  equivalents: EquivalentImpact,
  baseCurrency: string,
  selectedCurrency: string,
): ExportPayload {
  return {
    groupId: group.id,
    groupName: group.name,
    baseCurrency,
    currency: selectedCurrency,
    totals: { ...group.totals },
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
}

export function downloadJson(payload: ExportPayload): void {
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${payload.groupName.replace(/\s+/g, "_")}_${payload.groupId}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
