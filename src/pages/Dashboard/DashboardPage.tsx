import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SummaryCards,
  HistoryTable,
  DetailOverlay,
} from "../../components/dashboard";
import { Button } from "../../components/ui";
import { useTransportStore } from "../../stores/transportStore";
import { useAuthStore } from "../../stores/authStore";
import { exportGroupToJson } from "../../lib/export";
import type { TripGroup } from "../../types";

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const groups = useTransportStore((s) => s.groups);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEditGroup, setSelectedEditGroup] = useState<TripGroup | null>(
    null,
  );

  const handleDownload = (group: TripGroup) => {
    const currency = user?.currency || "EUR";
    exportGroupToJson(group, currency);
  };

  const handleDetails = (group: TripGroup) => {
    setSelectedEditGroup(group);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t("dashboard.welcome")}, {user?.firstName}
          </h1>
          <p className="text-gray-500">{t("dashboard.description")}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">{t("dashboard.shareStatistics")}</Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            {t("dashboard.addTransportation")}
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <SummaryCards />
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {t("dashboard.history")}
            </h2>
          </div>
          <HistoryTable
            groups={groups}
            onDetails={handleDetails}
            onDownload={handleDownload}
          />
        </section>
      </div>

      {/* Modals will be added here */}
      {/* {isAddModalOpen && <AddTransportationModal onClose={() => setIsAddModalOpen(false)} />} */}
      {/* {selectedEditGroup && <EditTransportationModal group={selectedEditGroup} onClose={() => setSelectedEditGroup(null)} />} */}
    </div>
  );
}
