import { useTranslation } from "react-i18next";
import { NAV_LINKS } from "../../lib/constants";
import { useDeviceType } from "../../hooks/useDeviceType";

interface NavLinksProps {
  /** "desktop": horizontal small text, "mobile": vertical large text */
  variant?: "desktop" | "mobile";
  onItemClick?: () => void;
}

export function NavLinks({ variant = "desktop", onItemClick }: NavLinksProps) {
  const { t } = useTranslation();
  const deviceType = useDeviceType();

  if (variant === "mobile") {
    return (
      <ul className="flex flex-col gap-6">
        {NAV_LINKS.map((link) => (
          <li
            key={link.name}
            onClick={onItemClick}
            className={`text-3xl font-bold uppercase transition-all cursor-pointer ${
              deviceType === link.name ? "text-green-100" : "text-darkblue-100"
            }`}
          >
            {t(link.labelKey)}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex items-center gap-6">
      {NAV_LINKS.map((link) => (
        <li
          key={link.name}
          className={`text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
            deviceType === link.name
              ? "text-green-100"
              : "text-darkblue-100 hover:text-green-100/80"
          }`}
        >
          {t(link.labelKey)}
        </li>
      ))}
    </ul>
  );
}
