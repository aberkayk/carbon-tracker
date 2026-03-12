import { useEffect, useRef } from "react";
import { Button } from "./Button";

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "danger";
}

export function Alert({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
}: AlertProps) {
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
      className="w-[90vw] max-w-sm rounded-xl p-0 backdrop:bg-black/50 bg-grey-50"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="px-6 py-6 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-lg font-bold font-display text-darkblue-100">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-darkblue-50">{description}</p>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <Button
            variant="ghost-danger"
            className="border border-black hover:border-red-100"
            size="sm"
            onClick={onClose}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "danger" ? "primary-danger" : "primary"}
            size="sm"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
