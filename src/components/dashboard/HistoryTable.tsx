import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Pagination } from "../ui";
import { DetailOverlay } from "./DetailOverlay";
import { formatNumber } from "../../lib/calculation";
import { DownloadIcon, DetailIcon, ChevronIcon } from "../../assets/icons";
import type { TripGroup } from "../../types";

interface HistoryTableProps {
  groups: TripGroup[];
  onDetails: (group: TripGroup) => void;
  onDownload: (group: TripGroup) => void;
  onAdd: () => void;
}

const ITEMS_PER_PAGE = 5;

export function HistoryTable({
  groups,
  onDetails,
  onDownload,
  onAdd,
}: HistoryTableProps) {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(groups.length / ITEMS_PER_PAGE));
  const paginatedGroups = groups.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const toggleOverlay = (groupId: string) => {
    setExpandedGroupId((prev) => (prev === groupId ? null : groupId));
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold font-display text-darkblue-100">
          <span className="hidden lg:inline">{t("dashboard.table")}</span>
          <span className="lg:hidden">{t("dashboard.history")}</span>
        </h2>
        <Button size="md" onClick={onAdd}>
          {t("dashboard.addTransportation")}
        </Button>
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block">
        <div className="border-b border-grey-50 pb-2 mb-1">
          <div className="grid grid-cols-[2rem_1fr_10rem_10rem_8rem_6rem] gap-4 text-sm text-darkblue-50 font-medium px-2">
            <span />
            <span>{t("dashboard.name")}</span>
            <span>{t("dashboard.distance")}</span>
            <span>{t("dashboard.weight")}</span>
            <span>{t("dashboard.amount")}</span>
            <span>{t("dashboard.activity")}</span>
          </div>
        </div>

        {paginatedGroups.map((group) => (
          <div key={group.id} className="border-b border-grey-50 last:border-0">
            <div className="grid grid-cols-[2rem_1fr_10rem_10rem_8rem_6rem] gap-4 items-center py-3 px-2">
              {/* Chevron */}
              <button
                onClick={() => toggleOverlay(group.id)}
                className="flex items-center justify-center w-6 h-6 text-darkblue-50 hover:text-darkblue-100 transition-colors"
                aria-label="Toggle details"
                aria-expanded={expandedGroupId === group.id}
              >
                <img
                  src={ChevronIcon}
                  alt=""
                  className={`w-4 h-4 transition-transform ${
                    expandedGroupId === group.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Name */}
              <span className="font-bold text-darkblue-100 text-sm truncate">
                {group.name}
              </span>

              {/* Distance */}
              <span className="text-sm text-darkblue-100">
                {formatNumber(group.totals.distanceKm, 0)} {t("units.km")}
              </span>

              {/* Weight */}
              <span className="text-sm text-darkblue-100">
                {formatNumber(group.totals.weightKg, 0)} {t("units.kg")}
              </span>

              {/* Amount */}
              <span className="text-sm font-bold text-green-100">
                {formatNumber(group.totals.amount, 2)}
              </span>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onDownload(group)}
                  className="p-1.5 text-darkblue-50 hover:text-darkblue-100 transition-colors"
                  aria-label={t("common.download")}
                >
                  <img src={DownloadIcon} alt="" className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDetails(group)}
                  className="p-1.5 text-darkblue-50 hover:text-darkblue-100 transition-colors"
                  aria-label={t("common.details")}
                >
                  <img src={DetailIcon} alt="" className="w-5 h-5" />
                </button>
              </div>
            </div>

            {expandedGroupId === group.id && (
              <div className="px-2 pb-3">
                <DetailOverlay
                  group={group}
                  onClose={() => setExpandedGroupId(null)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tablet: 2-column card grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-4">
        {paginatedGroups.map((group) => (
          <div
            key={group.id}
            className="bg-white border border-grey-50 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-darkblue-100 text-sm">
                {group.name}
              </h4>
              <button
                onClick={() => toggleOverlay(group.id)}
                className="p-1 text-darkblue-50 hover:text-darkblue-100 transition-colors"
                aria-label="Toggle details"
                aria-expanded={expandedGroupId === group.id}
              >
                <img
                  src={ChevronIcon}
                  alt=""
                  className={`w-4 h-4 transition-transform ${
                    expandedGroupId === group.id ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-darkblue-50">
                  {t("dashboard.amount")}
                </span>
                <span className="font-bold text-green-100">
                  {formatNumber(group.totals.amount, 2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-darkblue-50">
                  {t("dashboard.distance")}
                </span>
                <span className="text-darkblue-100">
                  {formatNumber(group.totals.distanceKm, 0)} {t("units.km")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-darkblue-50">
                  {t("dashboard.weight")}
                </span>
                <span className="text-darkblue-100">
                  {formatNumber(group.totals.weightKg, 0)} {t("units.kg")}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => onDownload(group)}
                className="w-full flex items-center justify-center gap-2 py-2 border border-pink-100 text-pink-100 rounded-md text-sm font-medium hover:bg-pink-100 hover:text-white-100 transition-colors"
              >
                <img src={DownloadIcon} alt="" className="w-4 h-4" />
                {t("common.download")}
              </button>
              <button
                onClick={() => onDetails(group)}
                className="w-full flex items-center justify-center gap-2 py-2 border border-pink-100 text-pink-100 rounded-md text-sm font-medium hover:bg-pink-100 hover:text-white-100 transition-colors"
              >
                <img src={DetailIcon} alt="" className="w-4 h-4" />
                {t("common.details")}
              </button>
            </div>

            {expandedGroupId === group.id && (
              <div className="mt-3">
                <DetailOverlay
                  group={group}
                  onClose={() => setExpandedGroupId(null)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: single column cards */}
      <div className="md:hidden space-y-4">
        {paginatedGroups.map((group) => (
          <div
            key={group.id}
            className="bg-white border border-grey-50 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-darkblue-100 text-sm">
                {group.name}
              </h4>
              <button
                onClick={() => toggleOverlay(group.id)}
                className="p-1 text-darkblue-50 hover:text-darkblue-100 transition-colors"
                aria-label="Toggle details"
                aria-expanded={expandedGroupId === group.id}
              >
                <img
                  src={ChevronIcon}
                  alt=""
                  className={`w-4 h-4 transition-transform ${
                    expandedGroupId === group.id ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-darkblue-50">
                  {t("dashboard.amount")}
                </span>
                <span className="font-bold text-green-100">
                  {formatNumber(group.totals.amount, 2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-darkblue-50">
                  {t("dashboard.distance")}
                </span>
                <span className="text-darkblue-100">
                  {formatNumber(group.totals.distanceKm, 0)} {t("units.km")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-darkblue-50">
                  {t("dashboard.weight")}
                </span>
                <span className="text-darkblue-100">
                  {formatNumber(group.totals.weightKg, 0)} {t("units.kg")}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => onDownload(group)}
                className="w-full flex items-center justify-center gap-2 py-2 border border-pink-100 text-pink-100 rounded-md text-sm font-medium hover:bg-pink-100 hover:text-white-100 transition-colors"
              >
                <img src={DownloadIcon} alt="" className="w-4 h-4" />
                {t("common.download")}
              </button>
              <button
                onClick={() => onDetails(group)}
                className="w-full flex items-center justify-center gap-2 py-2 border border-pink-100 text-pink-100 rounded-md text-sm font-medium hover:bg-pink-100 hover:text-white-100 transition-colors"
              >
                <img src={DetailIcon} alt="" className="w-4 h-4" />
                {t("common.details")}
              </button>
            </div>

            {expandedGroupId === group.id && (
              <div className="mt-3">
                <DetailOverlay
                  group={group}
                  onClose={() => setExpandedGroupId(null)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {groups.length === 0 && (
        <p className="text-center text-darkblue-50 py-8">
          {t("dashboard.noData")}
        </p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
