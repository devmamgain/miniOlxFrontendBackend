import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "../../lib/utils";



export function Modal({ open, onClose, title, children, footer, size = "md" }) {
    useEffect(() => {
        if (!open) return;
        const onKey = () => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    if (!open) return null;
    const sizes = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-2xl" };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
            <div className={cn("relative w-full rounded-xl bg-card shadow-xl", sizes[size])}>
                <div className="flex items-start justify-between border-b border-border p-4">
                    <h2 className="text-base font-semibold">{title}</h2>
                    <button onClick={onClose} className="rounded-md p-1 text-muted-foreground hover:bg-muted">
                        <X className="h-4 w-4" />
                    </button>
                </div>
                <div className="p-4">{children}</div>
                {footer && <div className="flex justify-end gap-2 border-t border-border p-4">{footer}</div>}
            </div>
        </div>
    );
}