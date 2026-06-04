import { forwardRef } from "react";
import { cn } from "../../lib/utils";


export const Input =
    ({ className, label, error, hint, id, ...props }, ref) => {
        const inputId = id || props.name;
        return (
            <div className="space-y-1.5">
                {label && (
                    <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={cn(
                        "h-10 w-full rounded-lg border bg-card px-3 text-sm text-foreground",
                        "placeholder:text-muted-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                        "disabled:cursor-not-allowed disabled:opacity-60",
                        error ? "border-destructive" : "border-border",
                        className,
                    )}
                    {...props}
                />
                {error ? (
                    <p className="text-xs text-destructive">{error}</p>
                ) : hint ? (
                    <p className="text-xs text-muted-foreground">{hint}</p>
                ) : null}
            </div>
        );
    }

Input.displayName = "Input";