import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CrossIcon } from "../../assets/icons";
import { NavLinks } from "./NavLinks";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function MobileMenu({ isOpen, onClose, onLogout }: MobileMenuProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 animate-in slide-in-from-left duration-300">
      <div className="p-8 h-full flex flex-col">
        <button
          onClick={onClose}
          className="p-2 -ml-2 mb-10 text-darkblue-100 self-start hover:opacity-70 transition-opacity"
        >
          <img src={CrossIcon} alt="Close" className="size-8" />
        </button>

        <div className="mb-12">
          <NavLinks variant="mobile" onItemClick={onClose} />
        </div>

        <div className="h-px bg-gray-100 mb-10" />

        <div className="flex flex-col gap-6">
          <Link
            to="/profile"
            onClick={onClose}
            className="text-2xl font-bold text-darkblue-100 hover:text-green-100 transition-colors"
          >
            {t("common.profile")}
          </Link>
          <Link
            to="/dashboard"
            onClick={onClose}
            className="text-2xl font-bold text-darkblue-100 hover:text-green-100 transition-colors"
          >
            {t("common.dashboard")}
          </Link>
          <button
            onClick={onLogout}
            className="text-left text-2xl font-bold text-darkblue-100 hover:text-pink-100 transition-colors"
          >
            {t("common.logout")}
          </button>
        </div>
      </div>
    </div>
  );
}
