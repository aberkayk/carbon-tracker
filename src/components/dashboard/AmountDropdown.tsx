import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { EquivalentImpact } from '../../types';
import { formatNumber } from '../../lib/calculation';

interface AmountDropdownProps {
  equivalents: EquivalentImpact;
}

export function AmountDropdown({ equivalents }: AmountDropdownProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    {
      label: t('dashboard.equivalents.kmDriven'),
      value: formatNumber(equivalents.equivalentKmDriven, 0),
      unit: t('units.km'),
    },
    {
      label: t('dashboard.equivalents.seaIceMelt'),
      value: formatNumber(equivalents.equivalentSeaIceM3, 2),
      unit: t('units.m3'),
    },
    {
      label: t('dashboard.equivalents.lightbulbUsage'),
      value: formatNumber(equivalents.equivalentLightbulbDays, 0),
      unit: t('units.days'),
    },
    {
      label: t('dashboard.equivalents.beefConsumption'),
      value: formatNumber(equivalents.equivalentBeefKg, 2),
      unit: t('units.kg'),
    },
  ];

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs text-green-600 hover:text-green-700 flex items-center gap-1"
        aria-expanded={isOpen}
      >
        {t('dashboard.equivalents.title')}
        <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          &#9660;
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 space-y-1.5 bg-green-50 rounded-lg p-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex justify-between text-xs text-gray-700"
            >
              <span>{item.label}</span>
              <span className="font-medium">
                {item.value} {item.unit}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
