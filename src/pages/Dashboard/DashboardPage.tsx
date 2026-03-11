import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SummaryCards, HistoryTable } from "../../components/dashboard";
import {
  AddTransportationModal,
  EditTransportationModal,
} from "../../components/transportation";
import { useTransportStore } from "../../stores/transportStore";
import { useAuthStore } from "../../stores/authStore";
import { exportGroupToJson } from "../../lib/export";
import { ShareIcon } from "../../assets/icons";
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
      {/* Welcome section */}
      <div className="mb-8 flex flex-col gap-2 md:gap-4 lg:gap-6">
        <h1 className="text-5xl font-bold font-display text-darkblue-100">
          {t("dashboard.welcome")} {user?.firstName},
        </h1>
        <p className="text-darkblue-50 mt-2 max-w-2xl">
          {t("dashboard.description")}
        </p>
        <button className="flex items-center gap-2 mt-3 text-darkblue-100 text-base font-medium hover:opacity-70 transition-opacity">
          <img src={ShareIcon} alt="" className="size-8" />
          {t("dashboard.shareStatistics")}
        </button>
      </div>

      <div className="space-y-16 md:space-y-12 lg:space-y-16">
        <section>
          <SummaryCards />
        </section>

        <section>
          <HistoryTable
            groups={groups}
            onDetails={handleDetails}
            onDownload={handleDownload}
            onAdd={() => setIsAddModalOpen(true)}
          />
        </section>
      </div>

      <AddTransportationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <EditTransportationModal
        isOpen={!!selectedEditGroup}
        onClose={() => setSelectedEditGroup(null)}
        group={selectedEditGroup}
      />
    </div>
  );
}
