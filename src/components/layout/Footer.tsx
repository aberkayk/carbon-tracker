import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/logo.png";
import { FOOTER_LINKS } from "../../lib/constants";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-gray-200">
      <div className="mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Logo & copyright */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <img src={logo} alt="Climateware" className="h-9 w-auto" />
            <span className="text-sm text-darkblue-100">
              {t("footer.copyright")}
            </span>
          </div>

          {/* Right: Links */}
          <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            {FOOTER_LINKS.map(({ labelKey, href }) => (
              <Link
                key={labelKey}
                to={href}
                className="text-sm text-darkblue-100 hover:text-grey-100 transition-colors"
              >
                {t(labelKey)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
