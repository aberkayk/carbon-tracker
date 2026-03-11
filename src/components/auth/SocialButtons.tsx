import googleIcon from "../../assets/icons/google.svg";
import facebookIcon from "../../assets/icons/facebook.svg";

interface SocialButtonProps {
  onClick?: () => void;
  type?: "button" | "submit";
}

export function GoogleButton({ onClick, type = "button" }: SocialButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex items-center justify-center px-5 py-2 bg-white border border-white rounded-md hover:bg-gray-50 transition-colors shadow-sm"
      aria-label="Sign in with Google"
    >
      <img src={googleIcon} alt="Google" className="w-5 h-5" />
    </button>
  );
}

export function FacebookButton({
  onClick,
  type = "button",
}: SocialButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex items-center justify-center px-5 py-2 bg-[#3875EA] rounded-md hover:opacity-90 transition-colors shadow-sm"
      aria-label="Sign in with Facebook"
    >
      <img
        src={facebookIcon}
        alt="Facebook"
        className="w-5 h-5 brightness-0 invert"
      />
    </button>
  );
}
