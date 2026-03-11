import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TripGroup, TripLeg } from '../types';
import {
  calculateLegEmission,
  calculateLegAmount,
  calculateGroupTotals,
} from '../lib/calculation';
import { DEFAULT_CONFIG } from '../lib/constants';

interface TransportState {
  groups: TripGroup[];
  addGroup: (
    name: string,
    legs: Omit<TripLeg, 'id' | 'groupId' | 'emissionKg' | 'amount'>[],
    currency: string
  ) => void;
  updateGroup: (
    groupId: string,
    name: string,
    legs: Omit<TripLeg, 'id' | 'groupId' | 'emissionKg' | 'amount'>[],
    currency: string
  ) => void;
  deleteGroup: (groupId: string) => void;
  recalculateAllAmounts: (currency: string) => void;
}

function buildLegs(
  groupId: string,
  rawLegs: Omit<TripLeg, 'id' | 'groupId' | 'emissionKg' | 'amount'>[],
  currency: string
): TripLeg[] {
  const fxRate = DEFAULT_CONFIG.fxRates[currency] || 1;
  return rawLegs.map((leg) => {
    const emissionKg = calculateLegEmission(
      leg.distanceKm,
      leg.weightKg,
      DEFAULT_CONFIG.emissionFactor
    );
    const amount = calculateLegAmount(
      emissionKg,
      DEFAULT_CONFIG.basePricePerKg,
      fxRate
    );
    return {
      ...leg,
      id: crypto.randomUUID(),
      groupId,
      emissionKg,
      amount,
    };
  });
}

export const useTransportStore = create<TransportState>()(
  persist(
    (set, get) => ({
      groups: [],

      addGroup: (name, rawLegs, currency) => {
        const groupId = crypto.randomUUID();
        const legs = buildLegs(groupId, rawLegs, currency);
        const totals = calculateGroupTotals(legs);
        const now = new Date().toISOString();
        const group: TripGroup = {
          id: groupId,
          name,
          legs,
          totals,
          createdAt: now,
          updatedAt: now,
        };
        set({ groups: [...get().groups, group] });
      },

      updateGroup: (groupId, name, rawLegs, currency) => {
        const legs = buildLegs(groupId, rawLegs, currency);
        const totals = calculateGroupTotals(legs);
        const groups = get().groups.map((g) =>
          g.id === groupId
            ? { ...g, name, legs, totals, updatedAt: new Date().toISOString() }
            : g
        );
        set({ groups });
      },

      deleteGroup: (groupId) => {
        set({ groups: get().groups.filter((g) => g.id !== groupId) });
      },

      recalculateAllAmounts: (currency) => {
        const fxRate = DEFAULT_CONFIG.fxRates[currency] || 1;
        const groups = get().groups.map((group) => {
          const legs = group.legs.map((leg) => ({
            ...leg,
            amount: calculateLegAmount(
              leg.emissionKg,
              DEFAULT_CONFIG.basePricePerKg,
              fxRate
            ),
          }));
          const totals = calculateGroupTotals(legs);
          return { ...group, legs, totals };
        });
        set({ groups });
      },
    }),
    { name: 'transport-storage' }
  )
);
