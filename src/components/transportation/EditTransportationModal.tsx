import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Input } from '../ui';
import { LegRow } from './LegRow';
import { useTransportStore } from '../../stores/transportStore';
import { useAuthStore } from '../../stores/authStore';
import { validateGroupName, validateLeg } from '../../lib/validation';
import { MAX_LEGS_PER_GROUP } from '../../lib/constants';
import type { TripGroup } from '../../types';

interface LegFormData {
  from: string;
  to: string;
  flightNo: string;
  date: string;
  weightKg: string;
  distanceKm: string;
}

const emptyLeg: LegFormData = {
  from: '',
  to: '',
  flightNo: '',
  date: '',
  weightKg: '',
  distanceKm: '',
};

interface EditTransportationModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: TripGroup | null;
}

export function EditTransportationModal({
  isOpen,
  onClose,
  group,
}: EditTransportationModalProps) {
  const { t } = useTranslation();
  const updateGroup = useTransportStore((s) => s.updateGroup);
  const currency = useAuthStore((s) => s.user?.currency || 'EUR');

  const [name, setName] = useState('');
  const [legs, setLegs] = useState<LegFormData[]>([{ ...emptyLeg }]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [maxLegsWarning, setMaxLegsWarning] = useState(false);

  useEffect(() => {
    if (group) {
      setName(group.name);
      setLegs(
        group.legs.map((leg) => ({
          from: leg.from,
          to: leg.to,
          flightNo: leg.flightNo,
          date: leg.date,
          weightKg: String(leg.weightKg),
          distanceKm: String(leg.distanceKm),
        }))
      );
      setErrors({});
      setMaxLegsWarning(false);
    }
  }, [group]);

  const handleLegChange = (index: number, field: string, value: string) => {
    setLegs((prev) =>
      prev.map((leg, i) => (i === index ? { ...leg, [field]: value } : leg))
    );
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`legs.${index}.${field}`];
      return next;
    });
  };

  const handleAddLeg = () => {
    if (legs.length >= MAX_LEGS_PER_GROUP) {
      setMaxLegsWarning(true);
      return;
    }
    setLegs((prev) => [...prev, { ...emptyLeg }]);
    setMaxLegsWarning(false);
  };

  const handleRemoveLeg = (index: number) => {
    setLegs((prev) => prev.filter((_, i) => i !== index));
    setMaxLegsWarning(false);
  };

  const handleSubmit = () => {
    if (!group) return;

    const allErrors: Record<string, string> = {};

    const nameError = validateGroupName(name);
    if (nameError) allErrors.name = t(nameError);

    legs.forEach((leg, index) => {
      const legErrors = validateLeg({
        from: leg.from,
        to: leg.to,
        flightNo: leg.flightNo,
        date: leg.date,
        weightKg: parseFloat(leg.weightKg),
        distanceKm: parseFloat(leg.distanceKm),
      });
      Object.entries(legErrors).forEach(([key, value]) => {
        allErrors[`legs.${index}.${key}`] = t(value);
      });
    });

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    updateGroup(
      group.id,
      name,
      legs.map((leg) => ({
        from: leg.from,
        to: leg.to,
        flightNo: leg.flightNo,
        date: leg.date,
        weightKg: parseFloat(leg.weightKg),
        distanceKm: parseFloat(leg.distanceKm),
      })),
      currency
    );

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('transportation.editTitle')}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSubmit}>{t('common.save')}</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label={t('transportation.groupName')}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => {
              const next = { ...prev };
              delete next.name;
              return next;
            });
          }}
          error={errors.name}
        />

        {legs.map((leg, index) => (
          <LegRow
            key={index}
            leg={leg}
            index={index}
            errors={errors}
            onChange={handleLegChange}
            onRemove={handleRemoveLeg}
            showRemove={legs.length > 1}
          />
        ))}

        {maxLegsWarning && (
          <p className="text-sm text-amber-600" role="alert">
            {t('transportation.maxLegsWarning')}
          </p>
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddLeg}
          disabled={legs.length >= MAX_LEGS_PER_GROUP}
        >
          + {t('transportation.addLeg')}
        </Button>
      </div>
    </Modal>
  );
}
