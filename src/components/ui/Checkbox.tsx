import { type InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  error?: string;
}

export function Checkbox({
  label,
  error,
  id,
  className = "",
  ...props
}: CheckboxProps) {
  const checkboxId =
    id ||
    (typeof label === "string"
      ? label.toLowerCase().replace(/\s+/g, "-")
      : undefined);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label
        htmlFor={checkboxId}
        className="flex items-start gap-3 cursor-pointer group"
      >
        <div className="relative mt-0.5 shrink-0">
          <input
            id={checkboxId}
            type="checkbox"
            className="peer sr-only"
            {...props}
          />
          <div className="w-5 h-5 flex items-center justify-center rounded border border-grey-100 bg-white-100 peer-checked:bg-grey-50 peer-checked:[&_svg]:opacity-100 transition-all peer-focus-ring">
            <svg
              className="w-3.5 h-3.5 text-darkblue-100 opacity-0 transition-opacity"
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5L4.5 8.5L11 1.5"
                stroke="#2A3349"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {label && (
          <div className="text-sm text-darkblue-100 select-none">{label}</div>
        )}
      </label>
      {error && (
        <p className="text-xs text-red-500 ml-8" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
