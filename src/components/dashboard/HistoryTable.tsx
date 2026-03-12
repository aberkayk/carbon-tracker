import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Pagination } from "../ui";
import { HistoryDesktopTable } from "./HistoryDesktopTable";
import { HistoryCard } from "./HistoryCard";
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

      <HistoryDesktopTable
        groups={paginatedGroups}
        expandedGroupId={expandedGroupId}
        onToggle={toggleOverlay}
        onDetails={onDetails}
        onDownload={onDownload}
        onCloseOverlay={() => setExpandedGroupId(null)}
      />

      {/* Mobile + Tablet: responsive card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4 items-start">
        {paginatedGroups.map((group) => (
          <HistoryCard
            key={group.id}
            group={group}
            isExpanded={expandedGroupId === group.id}
            onToggle={() => toggleOverlay(group.id)}
            onDetails={onDetails}
            onDownload={onDownload}
          />
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
