import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "primary-danger" | "outline" | "outline-pink" | "ghost" | "ghost-danger";
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
    "group inline-flex items-center justify-center gap-2 rounded-md transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed text-center align-middle font-bold text-sm leading-none hover:cursor-pointer";

  const variants: Record<string, string> = {
    primary: "bg-pink-100 text-white-100 hover:bg-pink-50 active:bg-pink-150",
    "primary-danger":
      "bg-red-100 text-white-100 hover:bg-red-100/85 active:bg-red-100/70",
    outline:
      "bg-transperant text-white-100 border border-white-100 hover:bg-white/25 active:bg-white/15",
    "outline-pink":
      "bg-transparent text-pink-100 border border-pink-100 hover:bg-pink-100 hover:text-white-100 active:bg-pink-150",
    ghost:
      "bg-transparent text-darkblue-100 hover:text-darkblue-50 active:text-darkblue-50",
    "ghost-danger":
      "bg-transparent text-darkblue-100 hover:text-red-100 active:text-red-100",
  };

  const sizes: Record<string, string> = {
    sm: "px-4 py-1.5",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-3 text-lg",
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
