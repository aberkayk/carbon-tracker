import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { MenuIcon, UserCircleIcon } from "../../assets/icons";
import logo from "../../assets/images/logo.png";
import { NAV_LINKS } from "../../lib/constants";
import { MobileMenu } from "./MobileMenu";
import { LanguageDropdown } from "./LanguageDropdown";
import { ProfileDropdown } from "./ProfileDropdown";
import { useDeviceType } from "../../hooks/useDeviceType";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type DropdownKey = "lang" | "profile";

export function Header() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const deviceType = useDeviceType();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);

  // Toggle: clicking the same key again closes it; clicking a new key opens it.
  const handleToggle = useCallback((key: DropdownKey) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  }, []);

  const handleClose = useCallback(() => {
    setOpenDropdown(null);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="border-b border-gray-100 sticky top-0 z-40 bg-white">
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo & Nav */}
          <div className="flex items-center gap-6">
            <button
              className="md:hidden p-2 -ml-2 text-darkblue-100 hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(true)}
            >
              <img src={MenuIcon} alt="Menu" className="size-8" />
            </button>

            <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              className="shrink-0 transition-transform active:scale-95"
            >
              <img src={logo} alt="Climateware" className="h-9 w-auto" />
            </Link>

            {/* Vertical Separator - Desktop Only */}
            <div className="hidden md:block h-8 w-px bg-gray-200" />

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <li
                  key={link.name}
                  className={`text-sm font-bold tracking-widest transition-all duration-300 uppercase ${
                    deviceType === link.name
                      ? "text-green-100"
                      : "text-darkblue-100 hover:text-green-100/80"
                  }`}
                >
                  {t(link.labelKey)}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Lang & User */}
          <div className="flex items-center gap-6">
            <LanguageDropdown
              open={openDropdown === "lang"}
              onToggle={() => handleToggle("lang")}
              onClose={handleClose}
            />

            <div className="h-6 w-px bg-gray-200 hidden md:block" />

            <ProfileDropdown
              open={openDropdown === "profile"}
              onToggle={() => handleToggle("profile")}
              onClose={handleClose}
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onLogout={handleLogout}
      />
    </header>
  );
}
