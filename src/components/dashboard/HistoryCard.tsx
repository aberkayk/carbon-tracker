import { useTranslation } from "react-i18next";
import { Button } from "../ui";
import { DetailOverlay } from "./DetailOverlay";
import { formatNumber } from "../../lib/calculation";
import { DownloadIconSvg, DetailIconSvg, ChevronIcon } from "../../assets/icons";
import type { TripGroup } from "../../types";

interface HistoryCardProps {
  group: TripGroup;
  isExpanded: boolean;
  onToggle: () => void;
  onDetails: (group: TripGroup) => void;
  onDownload: (group: TripGroup) => void;
}

export function HistoryCard({
  group,
  isExpanded,
  onToggle,
  onDetails,
  onDownload,
}: HistoryCardProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white border border-grey-50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-darkblue-100 text-sm">{group.name}</h4>
        <button
          onClick={onToggle}
          className="p-1 text-darkblue-50 hover:text-darkblue-100 transition-colors hover:cursor-pointer hover:bg-grey-50 rounded-md border border-grey-50"
          aria-label="Toggle details"
          aria-expanded={isExpanded}
        >
          <img
            src={ChevronIcon}
            alt=""
            className={`size-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-darkblue-50">{t("dashboard.amount")}</span>
          <span className="font-bold text-green-100">
            {formatNumber(group.totals.amount, 2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-darkblue-50">{t("dashboard.distance")}</span>
          <span className="text-darkblue-100">
            {formatNumber(group.totals.distanceKm, 0)} {t("units.km")}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-darkblue-50">{t("dashboard.weight")}</span>
          <span className="text-darkblue-100">
            {formatNumber(group.totals.weightKg, 0)} {t("units.kg")}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Button
          variant="outline-pink"
          fullWidth
          size="sm"
          className="text-sm font-medium"
          onClick={() => onDownload(group)}
        >
          <DownloadIconSvg className="w-4 h-4 text-pink-100 group-hover:text-white-100" />
          {t("common.download")}
        </Button>
        <Button
          variant="outline-pink"
          fullWidth
          size="sm"
          className="text-sm font-medium"
          onClick={() => onDetails(group)}
        >
          <DetailIconSvg className="w-4 h-4 text-pink-100 group-hover:text-white-100" />
          {t("common.details")}
        </Button>
      </div>

      {isExpanded && (
        <DetailOverlay group={group} onClose={onToggle} inline />
      )}
    </div>
  );
}
