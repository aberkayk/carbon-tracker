import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../stores/authStore";
import { UserCircleIcon } from "../../assets/icons";

const PROFILE_LINKS = [
  { labelKey: "common.profile", path: "/profile" },
  { labelKey: "common.dashboard", path: "/dashboard" },
] as const;

interface ProfileDropdownProps {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function ProfileDropdown({
  open,
  onToggle,
  onClose,
}: ProfileDropdownProps) {
  const { t } = useTranslation();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/login");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={onToggle}
        className={`p-1 transition-all duration-300 active:scale-90 ${
          open ? "text-green-100" : "text-darkblue-100 hover:text-green-100"
        }`}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <img src={UserCircleIcon} alt="Profile" className="w-7 h-7" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-3 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 animate-in fade-in zoom-in-95 duration-150 origin-top-right z-50"
        >
          {PROFILE_LINKS.map((item) => (
            <Link
              key={item.path}
              role="menuitem"
              to={item.path}
              onClick={onClose}
              className={`block px-5 py-3 text-base font-bold transition-colors ${
                location.pathname === item.path
                  ? "text-green-100"
                  : "text-darkblue-100 hover:text-green-100"
              }`}
            >
              {t(item.labelKey)}
            </Link>
          ))}

          <div className="my-2 h-px bg-gray-100" />

          <button
            role="menuitem"
            onClick={handleLogout}
            className="w-full text-left px-5 py-3 text-base font-bold text-darkblue-100 hover:text-pink-100 transition-colors"
          >
            {t("common.logout")}
          </button>
        </div>
      )}
    </div>
  );
}
