import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AmountDropdown } from "./AmountDropdown";
import { SummaryCard } from "./SummaryCard";
import { useTransportStore } from "../../stores/transportStore";
import { useAuthStore } from "../../stores/authStore";
import {
  calculateDashboardTotals,
  calculateEquivalents,
  formatCurrency,
  formatNumber,
  splitCurrencyValue,
} from "../../lib/calculation";
import { DEFAULT_CONFIG } from "../../lib/constants";
import {
  Co2Icon,
  DistanceIcon,
  FlightIcon,
  ContributionIcon,
  ChevronIcon,
} from "../../assets/icons";

export function SummaryCards() {
  const { t } = useTranslation();
  const groups = useTransportStore((s) => s.groups);
  const currency = useAuthStore((s) => s.user?.currency || "EUR");
  const [statsVisible, setStatsVisible] = useState(true);
  const [amountDropdownOpen, setAmountDropdownOpen] = useState(false);

  const totals = calculateDashboardTotals(groups);
  const equivalents = calculateEquivalents(
    totals.totalEmissionKgCO2e,
    DEFAULT_CONFIG.equivalencyFactors,
  );

  const paymentFormatted = formatCurrency(
    totals.totalPaymentInSelectedCurrency,
    currency,
  );
  const [paymentMain, paymentDecimal] = splitCurrencyValue(paymentFormatted);

  return (
    <>
      {/* Mobile: collapsible stats */}
      <div className="md:hidden">
        <button
          onClick={() => setStatsVisible(!statsVisible)}
          className="flex items-center gap-2 text-sm font-medium text-darkblue-100 mb-4"
          aria-expanded={statsVisible}
        >
          <img
            src={ChevronIcon}
            alt=""
            className={`size-6 transition-transform ${statsVisible ? "" : "rotate-180"}`}
          />
          {statsVisible ? t("dashboard.hideStats") : t("dashboard.showStats")}
        </button>

        {statsVisible && (
          <div className="space-y-3">
            <div>
              <SummaryCard
                icon={Co2Icon}
                title={t("dashboard.amount")}
                value={formatNumber(totals.totalEmissionKgCO2e, 0)}
                unit={t("units.kgCO2e")}
                size="sm"
                overlap
              />
              <AmountDropdown equivalents={equivalents} />
            </div>
            <SummaryCard
              icon={DistanceIcon}
              title={t("dashboard.distance")}
              value={formatNumber(totals.totalDistanceKm, 0)}
              unit={t("units.km")}
              size="sm"
            />
            <SummaryCard
              icon={FlightIcon}
              title={t("dashboard.totalTransportation")}
              value={String(totals.totalLegCount)}
              size="sm"
            />
            <SummaryCard
              icon={ContributionIcon}
              title={t("dashboard.payment")}
              value={paymentMain}
              unit={paymentDecimal}
              size="sm"
            />
          </div>
        )}
      </div>

      {/* Tablet / Desktop cards */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {/* Amount card + dropdown */}
        <div className="relative">
          <SummaryCard
            icon={Co2Icon}
            title={t("dashboard.amount")}
            value={formatNumber(totals.totalEmissionKgCO2e, 0)}
            unit={t("units.kgCO2e")}
            onToggle={() => setAmountDropdownOpen(!amountDropdownOpen)}
            isOpen={amountDropdownOpen}
          />
          {amountDropdownOpen && (
            <div className="absolute top-0 left-0 right-0 z-10">
              <AmountDropdown equivalents={equivalents} />
            </div>
          )}
        </div>
        <SummaryCard
          icon={DistanceIcon}
          title={t("dashboard.distance")}
          value={formatNumber(totals.totalDistanceKm, 0)}
          unit={t("units.km")}
        />
        <SummaryCard
          icon={FlightIcon}
          title={t("dashboard.totalTransportation")}
          value={String(totals.totalLegCount)}
        />
        <SummaryCard
          icon={ContributionIcon}
          title={t("dashboard.payment")}
          value={paymentMain}
          unit={paymentDecimal}
        />
      </div>
    </>
  );
}
