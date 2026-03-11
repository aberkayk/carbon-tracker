import { useState, type InputHTMLAttributes } from "react";
import { EyeOnIcon, EyeOffIcon } from "../../assets/icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
  hideLabel?: boolean;
}

export function Input({
  label,
  error,
  showPasswordToggle = false,
  hideLabel = false,
  type = "text",
  id,
  className = "",
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && !hideLabel && (
        <label
          htmlFor={inputId}
          className="text-sm font-normal text-darkblue-100"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          className={`w-full px-4 py-3 bg-white border rounded-xl text-sm transition-all text-darkblue-100 focus-ring placeholder:text-darkblue-50 ${
            error ? "border-red-100" : "border-white"
          } ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute bg-transparent right-3 top-1/2 -translate-y-1/2 p-1 transition-all focus-ring text-darkblue-100"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <img
              src={showPassword ? EyeOffIcon : EyeOnIcon}
              alt={showPassword ? "Hide password" : "Show password"}
              className="w-5 h-5"
            />
          </button>
        )}
      </div>
      {error && (
        <p
          id={`${inputId}-error`}
          className="text-xs text-red-500 mt-0.5 ml-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
