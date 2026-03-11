import { useTranslation } from "react-i18next";
import type { EquivalentImpact } from "../../types";
import { formatNumber } from "../../lib/calculation";
import { CarsIcon, IceIcon, LightbulbIcon, BeefIcon } from "../../assets/icons";

interface AmountDropdownProps {
  equivalents: EquivalentImpact;
}

export function AmountDropdown({ equivalents }: AmountDropdownProps) {
  const { t } = useTranslation();

  const items = [
    {
      icon: CarsIcon,
      value: formatNumber(equivalents.equivalentKmDriven, 0),
      unit: t("units.km"),
      label: t("dashboard.equivalents.kmDriven"),
    },
    {
      icon: IceIcon,
      value: formatNumber(equivalents.equivalentSeaIceM3, 2),
      unit: t("units.m3"),
      label: t("dashboard.equivalents.seaIceMelt"),
    },
    {
      icon: LightbulbIcon,
      value: formatNumber(equivalents.equivalentLightbulbDays, 0),
      unit: t("units.days"),
      label: t("dashboard.equivalents.lightbulbUsage"),
    },
    {
      icon: BeefIcon,
      value: formatNumber(equivalents.equivalentBeefKg, 2),
      unit: t("units.kg"),
      label: t("dashboard.equivalents.beefConsumption"),
    },
  ];

  return (
    <div className="bg-grey-50 rounded-xl p-4 flex flex-col gap-2 -mt-4 pt-6 md:mt-0 md:pt-26">
      <p className="text-base font-medium text-darkblue-50 mb-1">
        {t("dashboard.equivalents.title")}
      </p>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <img
            src={item.icon}
            alt={item.label}
            className="size-12 shrink-0 hidden md:block"
          />
          <span className="text-sm text-darkblue-50">
            {item.value} {item.unit} {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
