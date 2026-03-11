import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../stores/authStore";
import { SUPPORTED_LANGUAGES } from "../../lib/constants";
import { ChevronIcon, MenuIcon } from "../../assets/icons";

export function Header() {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to={isAuthenticated ? "/dashboard" : "/login"}
            className="font-bold text-xl text-green-700"
          >
            Climateware
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex gap-1">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`px-2 py-1 text-sm rounded ${
                    i18n.language === lang
                      ? "bg-green-100 text-green-700 font-semibold"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {isAuthenticated && user && (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
                >
                  {user.firstName} {user.lastName}
                  <img
                    src={ChevronIcon}
                    alt=""
                    className={`w-3 h-3 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {t("common.profile")}
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {t("common.dashboard")}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {t("common.logout")}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <img src={MenuIcon} alt="" className="w-6 h-6" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex gap-2 mb-4">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`px-3 py-1 text-sm rounded ${
                    i18n.language === lang
                      ? "bg-green-100 text-green-700 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            {isAuthenticated && (
              <>
                <Link
                  to="/profile"
                  className="block py-2 text-sm text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("common.profile")}
                </Link>
                <Link
                  to="/dashboard"
                  className="block py-2 text-sm text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("common.dashboard")}
                </Link>
                <button
                  onClick={handleLogout}
                  className="block py-2 text-sm text-gray-700"
                >
                  {t("common.logout")}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
