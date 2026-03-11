import { ChevronIcon } from "../../assets/icons";

interface SummaryCardProps {
  icon: string;
  title: string;
  value: string;
  unit?: string;
  size?: "sm" | "md";
  onToggle?: () => void;
  isOpen?: boolean;
  overlap?: boolean;
}

export function SummaryCard({
  icon,
  title,
  value,
  unit,
  size = "md",
  onToggle,
  isOpen,
  overlap,
}: SummaryCardProps) {
  const iconSize = size === "sm" ? "w-7 h-7" : "w-8 h-8";
  const valueSize = size === "sm" ? "text-3xl" : "text-2xl";
  const unitSize = size === "sm" ? "text-base" : "text-sm";

  return (
    <div
      className={`bg-white rounded-xl shadow-md p-4 ${onToggle || overlap ? "relative z-30" : ""}`}
    >
      <div className="flex items-start gap-3">
        <div className="p-3 bg-green-10 rounded-xl shrink-0">
          <img src={icon} alt="" className={iconSize} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-darkblue-50">{title}</p>
          <div className="flex items-baseline justify-between mt-0.5">
            <p className={`${valueSize} font-bold font-display text-darkblue-100`}>
              {value}
              {unit && (
                <span className={`${unitSize} font-normal text-darkblue-50 ml-1`}>
                  {unit}
                </span>
              )}
            </p>
            {onToggle && (
              <button
                onClick={onToggle}
                className="p-1 shrink-0 hover:cursor-pointer rounded-full hover:bg-grey-50"
                aria-expanded={isOpen}
              >
                <img
                  src={ChevronIcon}
                  alt=""
                  className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
