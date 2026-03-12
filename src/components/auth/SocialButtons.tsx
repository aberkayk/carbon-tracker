import { GoogleIcon, FacebookIcon } from "../../assets/icons";

interface SocialButtonProps {
  onClick?: () => void;
  type?: "button" | "submit";
  label?: string;
  fullWidth?: boolean;
}

export function GoogleButton({
  onClick,
  type = "button",
  label,
  fullWidth = false,
}: SocialButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center cursor-pointer gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors focus-ring${fullWidth ? " w-full" : ""}`}
      aria-label={label ?? "Sign in with Google"}
    >
      <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
      {label && (
        <span className="text-sm font-medium text-darkblue-100">{label}</span>
      )}
    </button>
  );
}

export function FacebookButton({
  onClick,
  type = "button",
  label,
  fullWidth = false,
}: SocialButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center cursor-pointer gap-2 px-5 py-2.5 bg-[#3875EA] rounded-md hover:opacity-90 transition-colors focus-ring${fullWidth ? " w-full" : ""}`}
      aria-label={label ?? "Sign in with Facebook"}
    >
      <img
        src={FacebookIcon}
        alt="Facebook"
        className="w-5 h-5 brightness-0 invert"
      />
      {label && <span className="text-sm font-medium text-white">{label}</span>}
    </button>
  );
}
