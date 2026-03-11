import { useTranslation } from 'react-i18next';
import { Input } from '../ui';

interface LegData {
  from: string;
  to: string;
  flightNo: string;
  date: string;
  weightKg: string;
  distanceKm: string;
}

interface LegRowProps {
  leg: LegData;
  index: number;
  errors: Record<string, string>;
  onChange: (index: number, field: string, value: string) => void;
  onRemove: (index: number) => void;
  showRemove: boolean;
}

export function LegRow({
  leg,
  index,
  errors,
  onChange,
  onRemove,
  showRemove,
}: LegRowProps) {
  const { t } = useTranslation();

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">
          Leg {index + 1}
        </span>
        {showRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700 text-sm"
            aria-label={t('transportation.removeLeg')}
          >
            &times;
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Input
          label={t('transportation.from')}
          value={leg.from}
          onChange={(e) => onChange(index, 'from', e.target.value)}
          error={errors[`legs.${index}.from`]}
        />
        <Input
          label={t('transportation.to')}
          value={leg.to}
          onChange={(e) => onChange(index, 'to', e.target.value)}
          error={errors[`legs.${index}.to`]}
        />
        <Input
          label={t('transportation.flightNo')}
          value={leg.flightNo}
          onChange={(e) => onChange(index, 'flightNo', e.target.value)}
          error={errors[`legs.${index}.flightNo`]}
        />
        <Input
          label={t('transportation.date')}
          type="date"
          value={leg.date}
          onChange={(e) => onChange(index, 'date', e.target.value)}
          error={errors[`legs.${index}.date`]}
        />
        <Input
          label={t('transportation.weight')}
          type="number"
          value={leg.weightKg}
          onChange={(e) => onChange(index, 'weightKg', e.target.value)}
          error={errors[`legs.${index}.weightKg`]}
        />
        <Input
          label={t('transportation.distance')}
          type="number"
          value={leg.distanceKm}
          onChange={(e) => onChange(index, 'distanceKm', e.target.value)}
          error={errors[`legs.${index}.distanceKm`]}
        />
      </div>
    </div>
  );
}
