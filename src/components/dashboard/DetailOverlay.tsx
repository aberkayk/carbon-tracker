import { useTranslation } from "react-i18next";
import { formatNumber } from "../../lib/calculation";
import type { TripGroup } from "../../types";

interface DetailOverlayProps {
  group: TripGroup;
  onClose: () => void;
  inline?: boolean;
}

export function DetailOverlay({ group, inline }: DetailOverlayProps) {
  const { t } = useTranslation();

  return (
    <div
      className={
        inline
          ? "px-1 pt-3 animate-accordion-down"
          : "bg-grey-50 rounded-b-xl px-4 pb-4 pt-8 -mt-4 mb-2 animate-accordion-down mx-auto"
      }
    >
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] gap-4 text-xs text-darkblue-50 pb-2 mb-1">
        <span>{t("transportation.date")}</span>
        <span>{t("transportation.from")}</span>
        <span>{t("transportation.to")}</span>
        <span>{t("transportation.flightNo")}</span>
        <span>{t("dashboard.distance")}</span>
        <span>{t("dashboard.weight")}</span>
      </div>
      {group.legs.map((leg) => (
        <div
          key={leg.id}
          className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] gap-4 py-4"
        >
          <span className="text-sm text-darkblue-100">{leg.date}</span>
          <span className="text-sm text-darkblue-100">{leg.from}</span>
          <span className="text-sm text-darkblue-100">{leg.to}</span>
          <span className="text-sm text-darkblue-100">{leg.flightNo}</span>
          <span className="text-sm text-darkblue-100">
            {formatNumber(leg.distanceKm, 0)} {t("units.km")}
          </span>
          <span className="text-sm text-darkblue-100">
            {formatNumber(leg.weightKg, 0)} {t("units.kg")}
          </span>
        </div>
      ))}
    </div>
  );
}
