import { useEffect, useRef, type ReactNode } from "react";
import { CrossIconSvg } from "../../assets/icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="w-[90vw] max-w-5xl rounded-xl p-0 backdrop:bg-black/50 bg-grey-50"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="flex flex-col max-h-[85vh]">
        <div className="flex items-start justify-between px-6 py-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold font-display text-darkblue-100">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-darkblue-50">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-darkblue-100 hover:bg-grey-100 rounded-full mt-0.5 ml-4 size-7 flex justify-center items-center hover:cursor-pointer "
            aria-label="Close"
          >
            <CrossIconSvg className="size-5 text-darkblue-100" />
          </button>
        </div>
        <div className="px-6 py-4 overflow-y-auto flex-1">{children}</div>
        {footer && (
          <div className="flex justify-end gap-3 px-6 py-4 border-t">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
}
