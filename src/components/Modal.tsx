import { useEffect, useRef, type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
      // Focus the first interactive element
      const focusable = contentRef.current?.querySelector<HTMLElement>(
        'input, textarea, button, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    } else {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 m-0 flex h-full w-full max-h-full max-w-full items-center justify-center bg-black/50 p-0 backdrop:bg-transparent"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div
        ref={contentRef}
        className="w-full max-w-[660px] rounded-2xl border border-[#999] bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </dialog>
  );
}
