import { useTranslation } from "react-i18next";
import { DetailOverlay } from "./DetailOverlay";
import { formatNumber } from "../../lib/calculation";
import { ChevronIcon, InvoiceIcon, DownloadIcon } from "../../assets/icons";
import type { TripGroup } from "../../types";

interface HistoryDesktopTableProps {
  groups: TripGroup[];
  expandedGroupId: string | null;
  onToggle: (groupId: string) => void;
  onDetails: (group: TripGroup) => void;
  onDownload: (group: TripGroup) => void;
  onCloseOverlay: () => void;
}

export function HistoryDesktopTable({
  groups,
  expandedGroupId,
  onToggle,
  onDetails,
  onDownload,
  onCloseOverlay,
}: HistoryDesktopTableProps) {
  const { t } = useTranslation();

  return (
    <div className="hidden lg:block">
      <div className="border-b border-grey-50 pb-2 mb-4">
        <div className="grid grid-cols-[2rem_1fr_10rem_10rem_8rem_6rem] gap-4 text-sm text-darkblue-50 font-medium px-2">
          <span />
          <span>{t("dashboard.name")}</span>
          <span>{t("dashboard.distance")}</span>
          <span>{t("dashboard.weight")}</span>
          <span>{t("dashboard.amount")}</span>
          <span>{t("dashboard.activity")}</span>
        </div>
      </div>

      {groups.map((group) => (
        <div
          key={group.id}
          className="border-grey-50 last:border-0 transition-shadow duration-300"
        >
          <div
            role="button"
            onClick={() => onToggle(group.id)}
            className={`grid grid-cols-[2rem_1fr_10rem_10rem_8rem_6rem] gap-4 items-center py-3 px-2 hover:cursor-pointer hover:shadow-md rounded-lg transition-all duration-300 ${
              expandedGroupId === group.id ? "shadow-md bg-white relative z-10" : ""
            }`}
          >
            <button
              className="flex items-center justify-center w-6 h-6 text-darkblue-50 hover:text-darkblue-100 transition-colors hover:cursor-pointer"
              aria-label="Toggle details"
              aria-expanded={expandedGroupId === group.id}
            >
              <img
                src={ChevronIcon}
                alt=""
                className={`size-8 transition-transform ${expandedGroupId === group.id ? "rotate-180" : ""}`}
              />
            </button>

            <span className="font-bold text-darkblue-100 text-sm truncate">
              {group.name}
            </span>

            <span className="text-sm text-darkblue-100">
              {formatNumber(group.totals.distanceKm, 0)} {t("units.km")}
            </span>

            <span className="text-sm text-darkblue-100">
              {formatNumber(group.totals.weightKg, 0)} {t("units.kg")}
            </span>

            <span className="text-sm font-bold text-green-100">
              {formatNumber(group.totals.amount, 2)}
            </span>

            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => onDownload(group)}
                className="p-1.5 text-darkblue-50 hover:text-darkblue-100 transition-colors"
                aria-label={t("common.download")}
              >
                <img
                  src={DownloadIcon}
                  alt=""
                  className="size-8 hover:cursor-pointer hover:bg-grey-50 rounded-full"
                />
              </button>
              <button
                onClick={() => onDetails(group)}
                className="p-1.5 text-darkblue-50 hover:text-darkblue-100 transition-colors"
                aria-label={t("common.details")}
              >
                <img
                  src={InvoiceIcon}
                  alt=""
                  className="size-8 hover:cursor-pointer hover:bg-grey-50 rounded-full"
                />
              </button>
            </div>
          </div>

          {expandedGroupId === group.id && (
            <DetailOverlay group={group} onClose={onCloseOverlay} />
          )}
        </div>
      ))}
    </div>
  );
}
