import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../lib/calculation';
import type { TripGroup } from '../../types';

interface DetailOverlayProps {
  group: TripGroup;
  onClose: () => void;
}

export function DetailOverlay({ group, onClose }: DetailOverlayProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-700">
          {group.name} - Legs
        </h4>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-sm"
          aria-label={t('common.close')}
        >
          &times;
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-2 pr-3">{t('transportation.date')}</th>
              <th className="pb-2 pr-3">{t('transportation.from')}</th>
              <th className="pb-2 pr-3">{t('transportation.to')}</th>
              <th className="pb-2 pr-3">{t('transportation.flightNo')}</th>
              <th className="pb-2 pr-3">{t('dashboard.distance')}</th>
              <th className="pb-2">{t('dashboard.weight')}</th>
            </tr>
          </thead>
          <tbody>
            {group.legs.map((leg) => (
              <tr key={leg.id} className="border-b border-gray-100">
                <td className="py-2 pr-3">{leg.date}</td>
                <td className="py-2 pr-3">{leg.from}</td>
                <td className="py-2 pr-3">{leg.to}</td>
                <td className="py-2 pr-3">{leg.flightNo}</td>
                <td className="py-2 pr-3">
                  {formatNumber(leg.distanceKm, 2)} {t('units.km')}
                </td>
                <td className="py-2">
                  {formatNumber(leg.weightKg, 2)} {t('units.kg')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
