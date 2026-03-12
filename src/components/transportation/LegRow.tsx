import { useTranslation } from "react-i18next";
import { Input } from "../ui";
import { CrossIconSvg, PlusIconSvg } from "../../assets/icons";

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
  onAdd?: () => void;
  isFirst: boolean;
}

export function LegRow({
  leg,
  index,
  errors,
  onChange,
  onRemove,
  onAdd,
  isFirst,
}: LegRowProps) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-3 items-end">
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 flex-1">
        <Input
          label={t("transportation.from")}
          placeholder={t("transportation.from")}
          value={leg.from}
          onChange={(e) => onChange(index, "from", e.target.value)}
          error={errors[`legs.${index}.from`]}
        />
        <Input
          label={t("transportation.to")}
          placeholder={t("transportation.to")}
          value={leg.to}
          onChange={(e) => onChange(index, "to", e.target.value)}
          error={errors[`legs.${index}.to`]}
        />
        <Input
          label={t("transportation.flightNo")}
          placeholder="e.g. TK123"
          value={leg.flightNo}
          onChange={(e) => onChange(index, "flightNo", e.target.value)}
          error={errors[`legs.${index}.flightNo`]}
        />
        <Input
          label={t("transportation.date")}
          type="date"
          value={leg.date}
          onChange={(e) => onChange(index, "date", e.target.value)}
          error={errors[`legs.${index}.date`]}
        />
        <Input
          label={t("transportation.weight")}
          type="number"
          placeholder="0"
          value={leg.weightKg}
          onChange={(e) => onChange(index, "weightKg", e.target.value)}
          error={errors[`legs.${index}.weightKg`]}
        />
        <Input
          label={t("transportation.distance")}
          type="number"
          placeholder="0"
          value={leg.distanceKm}
          onChange={(e) => onChange(index, "distanceKm", e.target.value)}
          error={errors[`legs.${index}.distanceKm`]}
        />
      </div>

      <div className="shrink-0 pb-1 my-auto">
        {isFirst ? (
          <button
            type="button"
            onClick={onAdd}
            disabled={!onAdd}
            className="size-8 flex items-center justify-center rounded-lg hover:bg-darkblue-100/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed group"
            aria-label={t("transportation.addLeg")}
          >
            <PlusIconSvg className="size-5 text-darkblue-100" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="size-8 flex items-center justify-center rounded-lg hover:bg-red-100/10 transition-colors group"
            aria-label={t("transportation.removeLeg")}
          >
            <CrossIconSvg className="size-5 text-red-100" />
          </button>
        )}
      </div>
    </div>
  );
}
