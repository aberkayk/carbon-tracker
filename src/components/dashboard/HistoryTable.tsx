import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Pagination } from '../ui';
import { DetailOverlay } from './DetailOverlay';
import { useAuthStore } from '../../stores/authStore';
import { formatCurrency, formatNumber } from '../../lib/calculation';
import type { TripGroup } from '../../types';

interface HistoryTableProps {
  groups: TripGroup[];
  onDetails: (group: TripGroup) => void;
  onDownload: (group: TripGroup) => void;
}

const ITEMS_PER_PAGE = 5;

export function HistoryTable({
  groups,
  onDetails,
  onDownload,
}: HistoryTableProps) {
  const { t } = useTranslation();
  const currency = useAuthStore((s) => s.user?.currency || 'EUR');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);

  const totalPages = Math.ceil(groups.length / ITEMS_PER_PAGE);
  const paginatedGroups = groups.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleOverlay = (groupId: string) => {
    setExpandedGroupId((prev) => (prev === groupId ? null : groupId));
  };

  return (
    <div>
      {/* Desktop table */}
      <div className="hidden lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-3 pr-4">{t('dashboard.name')}</th>
              <th className="pb-3 pr-4">{t('dashboard.distance')}</th>
              <th className="pb-3 pr-4">{t('dashboard.weight')}</th>
              <th className="pb-3 pr-4">{t('dashboard.amount')}</th>
              <th className="pb-3 text-right">{t('common.details')}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedGroups.map((group) => (
              <tr key={group.id}>
                <td colSpan={5} className="p-0">
                  <div className="border-b border-gray-100">
                    <div className="flex items-center py-3">
                      <button
                        onClick={() => toggleOverlay(group.id)}
                        className="mr-2 text-gray-400 hover:text-gray-600 transition-transform"
                        aria-label="Toggle details"
                      >
                        <span
                          className={`inline-block transition-transform ${
                            expandedGroupId === group.id ? 'rotate-90' : ''
                          }`}
                        >
                          &#9654;
                        </span>
                      </button>
                      <span className="flex-1 pr-4">{group.name}</span>
                      <span className="w-32 pr-4">
                        {formatNumber(group.totals.distanceKm, 2)}{' '}
                        {t('units.km')}
                      </span>
                      <span className="w-32 pr-4">
                        {formatNumber(group.totals.weightKg, 2)}{' '}
                        {t('units.kg')}
                      </span>
                      <span className="w-32 pr-4">
                        {formatCurrency(group.totals.amount, currency)}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDownload(group)}
                        >
                          {t('common.download')}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDetails(group)}
                        >
                          {t('common.details')}
                        </Button>
                      </div>
                    </div>
                    {expandedGroupId === group.id && (
                      <DetailOverlay
                        group={group}
                        onClose={() => setExpandedGroupId(null)}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tablet/Mobile cards */}
      <div className="lg:hidden space-y-3">
        {paginatedGroups.map((group) => (
          <div
            key={group.id}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{group.name}</h4>
              <button
                onClick={() => toggleOverlay(group.id)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Toggle details"
              >
                <span
                  className={`inline-block transition-transform ${
                    expandedGroupId === group.id ? 'rotate-90' : ''
                  }`}
                >
                  &#9654;
                </span>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm mb-3">
              <div>
                <p className="text-gray-500">{t('dashboard.distance')}</p>
                <p className="font-medium">
                  {formatNumber(group.totals.distanceKm, 2)} {t('units.km')}
                </p>
              </div>
              <div>
                <p className="text-gray-500">{t('dashboard.weight')}</p>
                <p className="font-medium">
                  {formatNumber(group.totals.weightKg, 2)} {t('units.kg')}
                </p>
              </div>
              <div>
                <p className="text-gray-500">{t('dashboard.amount')}</p>
                <p className="font-medium">
                  {formatCurrency(group.totals.amount, currency)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDownload(group)}
              >
                {t('common.download')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDetails(group)}
              >
                {t('common.details')}
              </Button>
            </div>
            {expandedGroupId === group.id && (
              <DetailOverlay
                group={group}
                onClose={() => setExpandedGroupId(null)}
              />
            )}
          </div>
        ))}
      </div>

      {groups.length === 0 && (
        <p className="text-center text-gray-500 py-8">{t('dashboard.noData')}</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
