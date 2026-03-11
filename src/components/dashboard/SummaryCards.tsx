import { useTranslation } from 'react-i18next';
import { Card } from '../ui';
import { AmountDropdown } from './AmountDropdown';
import { useTransportStore } from '../../stores/transportStore';
import { useAuthStore } from '../../stores/authStore';
import {
  calculateDashboardTotals,
  calculateEquivalents,
  formatCurrency,
  formatNumber,
} from '../../lib/calculation';
import { DEFAULT_CONFIG } from '../../lib/constants';

export function SummaryCards() {
  const { t } = useTranslation();
  const groups = useTransportStore((s) => s.groups);
  const currency = useAuthStore((s) => s.user?.currency || 'EUR');

  const totals = calculateDashboardTotals(groups);
  const equivalents = calculateEquivalents(
    totals.totalEmissionKgCO2e,
    DEFAULT_CONFIG.equivalencyFactors
  );

  const cards = [
    {
      title: t('dashboard.amount'),
      value: `${formatNumber(totals.totalEmissionKgCO2e, 2)}`,
      unit: t('units.kgCO2e'),
      dropdown: true,
    },
    {
      title: t('dashboard.distance'),
      value: `${formatNumber(totals.totalDistanceKm, 2)}`,
      unit: t('units.km'),
    },
    {
      title: t('dashboard.totalTransportation'),
      value: `${totals.totalLegCount}`,
      unit: '',
    },
    {
      title: t('dashboard.payment'),
      value: formatCurrency(
        totals.totalPaymentInSelectedCurrency,
        currency
      ),
      unit: '',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className="p-4">
          <p className="text-sm text-gray-500">{card.title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {card.value}
            {card.unit && (
              <span className="text-sm font-normal text-gray-500 ml-1">
                {card.unit}
              </span>
            )}
          </p>
          {card.dropdown && <AmountDropdown equivalents={equivalents} />}
        </Card>
      ))}
    </div>
  );
}
