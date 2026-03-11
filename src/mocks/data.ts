import type { User, TripGroup } from "../types";
import {
  calculateLegEmission,
  calculateLegAmount,
  calculateGroupTotals,
} from "../lib/calculation";
import { DEFAULT_CONFIG } from "../lib/constants";

export const seedUser: User = {
  id: "user-seed-1",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "password123",
  currency: "EUR",
  language: "en",
  notificationOptIn: true,
  social: { googleConnected: false, facebookConnected: false },
};

type RawLeg = {
  id: string;
  groupId: string;
  from: string;
  to: string;
  flightNo: string;
  date: string;
  weightKg: number;
  distanceKm: number;
};

function buildLegs(rawLegs: RawLeg[]) {
  const fxRate = DEFAULT_CONFIG.fxRates["EUR"];
  return rawLegs.map((leg) => {
    const emissionKg = calculateLegEmission(
      leg.distanceKm,
      leg.weightKg,
      DEFAULT_CONFIG.emissionFactor,
    );
    const amount = calculateLegAmount(
      emissionKg,
      DEFAULT_CONFIG.basePricePerKg,
      fxRate,
    );
    return { ...leg, emissionKg, amount };
  });
}

const group1Legs = buildLegs([
  { id: "leg-1-1", groupId: "group-1", from: "IST", to: "FRA", flightNo: "TK1587", date: "2026-01-15", weightKg: 85, distanceKm: 1860 },
  { id: "leg-1-2", groupId: "group-1", from: "FRA", to: "IST", flightNo: "TK1588", date: "2026-01-20", weightKg: 85, distanceKm: 1860 },
]);

const group2Legs = buildLegs([
  { id: "leg-2-1", groupId: "group-2", from: "IST", to: "DXB", flightNo: "TK798", date: "2026-02-03", weightKg: 90, distanceKm: 2920 },
  { id: "leg-2-2", groupId: "group-2", from: "DXB", to: "SIN", flightNo: "EK356", date: "2026-02-05", weightKg: 90, distanceKm: 5840 },
  { id: "leg-2-3", groupId: "group-2", from: "SIN", to: "IST", flightNo: "TK57",  date: "2026-02-10", weightKg: 90, distanceKm: 8110 },
]);

const group3Legs = buildLegs([
  { id: "leg-3-1", groupId: "group-3", from: "IST", to: "JFK", flightNo: "TK3",   date: "2026-03-08", weightKg: 80, distanceKm: 9770 },
  { id: "leg-3-2", groupId: "group-3", from: "JFK", to: "ORD", flightNo: "AA123", date: "2026-03-09", weightKg: 80, distanceKm: 1190 },
  { id: "leg-3-3", groupId: "group-3", from: "ORD", to: "IST", flightNo: "TK6",   date: "2026-03-14", weightKg: 80, distanceKm: 9600 },
]);

const group4Legs = buildLegs([
  { id: "leg-4-1", groupId: "group-4", from: "IST", to: "LHR", flightNo: "TK1985", date: "2025-11-04", weightKg: 78, distanceKm: 2510 },
  { id: "leg-4-2", groupId: "group-4", from: "LHR", to: "CDG", flightNo: "BA308",  date: "2025-11-07", weightKg: 78, distanceKm: 340  },
  { id: "leg-4-3", groupId: "group-4", from: "CDG", to: "AMS", flightNo: "AF1240", date: "2025-11-09", weightKg: 78, distanceKm: 430  },
  { id: "leg-4-4", groupId: "group-4", from: "AMS", to: "IST", flightNo: "TK1952", date: "2025-11-12", weightKg: 78, distanceKm: 2200 },
]);

const group5Legs = buildLegs([
  { id: "leg-5-1", groupId: "group-5", from: "IST", to: "GRU", flightNo: "TK15",   date: "2025-10-06", weightKg: 92, distanceKm: 10050 },
  { id: "leg-5-2", groupId: "group-5", from: "GRU", to: "EZE", flightNo: "LA506",  date: "2025-10-08", weightKg: 92, distanceKm: 1760  },
  { id: "leg-5-3", groupId: "group-5", from: "EZE", to: "SCL", flightNo: "AR1402", date: "2025-10-11", weightKg: 92, distanceKm: 1130  },
  { id: "leg-5-4", groupId: "group-5", from: "SCL", to: "GRU", flightNo: "LA505",  date: "2025-10-14", weightKg: 92, distanceKm: 2620  },
  { id: "leg-5-5", groupId: "group-5", from: "GRU", to: "IST", flightNo: "TK16",   date: "2025-10-16", weightKg: 92, distanceKm: 10050 },
]);

const group6Legs = buildLegs([
  { id: "leg-6-1", groupId: "group-6", from: "IST", to: "NRT", flightNo: "TK197",  date: "2025-09-10", weightKg: 88, distanceKm: 9330 },
  { id: "leg-6-2", groupId: "group-6", from: "NRT", to: "ICN", flightNo: "JL951",  date: "2025-09-14", weightKg: 88, distanceKm: 1210 },
  { id: "leg-6-3", groupId: "group-6", from: "ICN", to: "PEK", flightNo: "OZ331",  date: "2025-09-16", weightKg: 88, distanceKm: 950  },
  { id: "leg-6-4", groupId: "group-6", from: "PEK", to: "IST", flightNo: "TK90",   date: "2025-09-20", weightKg: 88, distanceKm: 6300 },
]);

const group7Legs = buildLegs([
  { id: "leg-7-1", groupId: "group-7", from: "IST", to: "CAI", flightNo: "TK692",  date: "2025-08-03", weightKg: 75, distanceKm: 1320 },
  { id: "leg-7-2", groupId: "group-7", from: "CAI", to: "ADD", flightNo: "ET811",  date: "2025-08-05", weightKg: 75, distanceKm: 3060 },
  { id: "leg-7-3", groupId: "group-7", from: "ADD", to: "NBO", flightNo: "ET300",  date: "2025-08-07", weightKg: 75, distanceKm: 1160 },
  { id: "leg-7-4", groupId: "group-7", from: "NBO", to: "JNB", flightNo: "KQ100",  date: "2025-08-10", weightKg: 75, distanceKm: 3380 },
  { id: "leg-7-5", groupId: "group-7", from: "JNB", to: "IST", flightNo: "TK46",   date: "2025-08-15", weightKg: 75, distanceKm: 7180 },
]);

const group8Legs = buildLegs([
  { id: "leg-8-1", groupId: "group-8", from: "IST", to: "SYD", flightNo: "TK73",   date: "2025-07-02", weightKg: 95, distanceKm: 14270 },
  { id: "leg-8-2", groupId: "group-8", from: "SYD", to: "MEL", flightNo: "QF430",  date: "2025-07-05", weightKg: 95, distanceKm: 710   },
  { id: "leg-8-3", groupId: "group-8", from: "MEL", to: "IST", flightNo: "TK72",   date: "2025-07-10", weightKg: 95, distanceKm: 14030 },
]);

const group9Legs = buildLegs([
  { id: "leg-9-1", groupId: "group-9", from: "IST", to: "YYZ", flightNo: "TK17",   date: "2025-06-08", weightKg: 82, distanceKm: 9360 },
  { id: "leg-9-2", groupId: "group-9", from: "YYZ", to: "YVR", flightNo: "AC115",  date: "2025-06-09", weightKg: 82, distanceKm: 3360 },
  { id: "leg-9-3", groupId: "group-9", from: "YVR", to: "LAX", flightNo: "AC551",  date: "2025-06-11", weightKg: 82, distanceKm: 1740 },
  { id: "leg-9-4", groupId: "group-9", from: "LAX", to: "IST", flightNo: "TK10",   date: "2025-06-16", weightKg: 82, distanceKm: 10100 },
]);

const group10Legs = buildLegs([
  { id: "leg-10-1", groupId: "group-10", from: "IST", to: "DOH", flightNo: "TK780",  date: "2025-05-12", weightKg: 70, distanceKm: 2340 },
  { id: "leg-10-2", groupId: "group-10", from: "DOH", to: "BOM", flightNo: "QR556",  date: "2025-05-13", weightKg: 70, distanceKm: 1980 },
  { id: "leg-10-3", groupId: "group-10", from: "BOM", to: "DEL", flightNo: "AI657",  date: "2025-05-15", weightKg: 70, distanceKm: 1140 },
  { id: "leg-10-4", groupId: "group-10", from: "DEL", to: "IST", flightNo: "TK712",  date: "2025-05-18", weightKg: 70, distanceKm: 4450 },
]);

export const seedGroups: TripGroup[] = [
  {
    id: "group-1",
    name: "Europe Business Trip",
    legs: group1Legs,
    totals: calculateGroupTotals(group1Legs),
    createdAt: "2026-01-15T08:00:00.000Z",
    updatedAt: "2026-01-15T08:00:00.000Z",
  },
  {
    id: "group-2",
    name: "Asia Summit",
    legs: group2Legs,
    totals: calculateGroupTotals(group2Legs),
    createdAt: "2026-02-03T08:00:00.000Z",
    updatedAt: "2026-02-03T08:00:00.000Z",
  },
  {
    id: "group-3",
    name: "North America Conference",
    legs: group3Legs,
    totals: calculateGroupTotals(group3Legs),
    createdAt: "2026-03-08T08:00:00.000Z",
    updatedAt: "2026-03-08T08:00:00.000Z",
  },
  {
    id: "group-4",
    name: "Western Europe Tour",
    legs: group4Legs,
    totals: calculateGroupTotals(group4Legs),
    createdAt: "2025-11-04T08:00:00.000Z",
    updatedAt: "2025-11-04T08:00:00.000Z",
  },
  {
    id: "group-5",
    name: "South America Sales Tour",
    legs: group5Legs,
    totals: calculateGroupTotals(group5Legs),
    createdAt: "2025-10-06T08:00:00.000Z",
    updatedAt: "2025-10-06T08:00:00.000Z",
  },
  {
    id: "group-6",
    name: "East Asia Tech Forum",
    legs: group6Legs,
    totals: calculateGroupTotals(group6Legs),
    createdAt: "2025-09-10T08:00:00.000Z",
    updatedAt: "2025-09-10T08:00:00.000Z",
  },
  {
    id: "group-7",
    name: "Africa Regional Visit",
    legs: group7Legs,
    totals: calculateGroupTotals(group7Legs),
    createdAt: "2025-08-03T08:00:00.000Z",
    updatedAt: "2025-08-03T08:00:00.000Z",
  },
  {
    id: "group-8",
    name: "Australia & New Zealand",
    legs: group8Legs,
    totals: calculateGroupTotals(group8Legs),
    createdAt: "2025-07-02T08:00:00.000Z",
    updatedAt: "2025-07-02T08:00:00.000Z",
  },
  {
    id: "group-9",
    name: "Canada West Coast Trip",
    legs: group9Legs,
    totals: calculateGroupTotals(group9Legs),
    createdAt: "2025-06-08T08:00:00.000Z",
    updatedAt: "2025-06-08T08:00:00.000Z",
  },
  {
    id: "group-10",
    name: "Middle East & India Circuit",
    legs: group10Legs,
    totals: calculateGroupTotals(group10Legs),
    createdAt: "2025-05-12T08:00:00.000Z",
    updatedAt: "2025-05-12T08:00:00.000Z",
  },
];
