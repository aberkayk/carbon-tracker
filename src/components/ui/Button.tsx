import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed text-center align-middle font-bold text-[18px] leading-none";

  const variants: Record<string, string> = {
    primary: "bg-pink-100 text-white-100 hover:bg-pink-50 active:bg-pink-150 ",
    outline:
      "bg-transperant text-white-100 border border-white-100 hover:bg-white/25 active:bg-white/15",
  };

  const sizes: Record<string, string> = {
    sm: "px-4 py-1.5",
    md: "px-6 py-3",
    lg: "px-8 py-3",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
