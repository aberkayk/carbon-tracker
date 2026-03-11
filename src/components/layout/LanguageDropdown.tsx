import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronIcon } from "../../assets/icons";
import { LANGUAGES_CONFIG } from "../../lib/constants";

interface LanguageDropdownProps {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function LanguageDropdown({
  open,
  onToggle,
  onClose,
}: LanguageDropdownProps) {
  const { i18n, t } = useTranslation();
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

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem("language", code);
    onClose();
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 text-sm font-bold text-darkblue-100 uppercase hover:text-green-100 transition-colors"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {i18n.language.toUpperCase()}
        <img
          src={ChevronIcon}
          alt=""
          className={`w-3 h-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-3 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 animate-in fade-in zoom-in-95 duration-150 origin-top-right z-50"
        >
          {LANGUAGES_CONFIG.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={i18n.language === lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full text-left px-5 py-3 text-base font-bold transition-colors ${
                i18n.language === lang.code
                  ? "text-pink-100"
                  : "text-darkblue-100 hover:text-pink-100"
              }`}
            >
              {t(`common.languages.${lang.code}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
