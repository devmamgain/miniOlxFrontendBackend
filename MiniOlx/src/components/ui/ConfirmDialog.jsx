import { Modal } from "./Modal";
import { Button } from "./Button";

export function ConfirmDialog({
    open, onClose, onConfirm, title, description,
    confirmLabel = "Confirm", cancelLabel = "Cancel", variant = "primary", loading,
}) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            title={title}
            footer={
                <>
                    <Button variant="outline" onClick={onClose} disabled={loading}>{cancelLabel}</Button>
                    <Button variant={variant} onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
                </>
            }
        >
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </Modal>
    );
}