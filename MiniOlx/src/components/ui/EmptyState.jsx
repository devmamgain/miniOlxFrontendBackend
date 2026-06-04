import { cn } from "../../lib/utils";

export function EmptyState({
    icon,
    title,
    description,
    action,
    className,
}) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center",
                className
            )}
        >
            {icon && (
                <div className="mb-4 text-muted-foreground">
                    {icon}
                </div>
            )}

            <h3 className="text-base font-semibold text-foreground">
                {title}
            </h3>

            {description && (
                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                    {description}
                </p>
            )}

            {action && (
                <div className="mt-5">
                    {action}
                </div>
            )}
        </div>
    );
}