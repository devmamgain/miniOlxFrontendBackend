import { cn } from "../../lib/utils";



const variants = {
    default: "bg-accent text-accent-foreground",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-warning-foreground",
    destructive: "bg-destructive/15 text-destructive",
    muted: "bg-muted text-muted-foreground",
};

export function Badge({ className, variant = "default", ...props }) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                variants[variant],
                className,
            )}
            {...props}
        />
    );
}
