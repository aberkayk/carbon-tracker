import { useEffect, useRef } from "react";

interface DropdownProps {
  open: boolean;
  onClose: () => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  width?: string;
}

export function Dropdown({
  open,
  onClose,
  trigger,
  children,
  align = "right",
  width = "w-44",
}: DropdownProps) {
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

  return (
    <div className="relative" ref={ref}>
      {trigger}
      {open && (
        <div
          className={`absolute ${align === "right" ? "right-0" : "left-0"} top-full mt-3 ${width} bg-white rounded-2xl shadow-xl border border-gray-100 py-3 animate-in fade-in zoom-in-95 duration-150 origin-top-right z-50`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
