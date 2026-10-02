"use client";

import Modal from "./Modal";

export default function ConfirmDialog({
  open,
  title = "تأیید عملیات",
  message,
  confirmText = "تأیید",
  cancelText = "انصراف",
  danger = false,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      width={460}
      footer={
        <>
          <button type="button" className="secondary-button" onClick={onClose}>{cancelText}</button>
          <button type="button" className={danger ? "danger-button" : "primary-button"} onClick={onConfirm}>{confirmText}</button>
        </>
      }
    >
      <p className="confirm-message">{message}</p>
    </Modal>
  );
}
