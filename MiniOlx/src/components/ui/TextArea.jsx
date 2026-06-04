import { forwardRef } from "react";
import { cn } from "../../lib/utils";



export const TextArea =
    ({ className, label, error, id, ...props }, ref) => {
        const tid = id || props.name;
        return (
            <div className="space-y-1.5">
                {label && (
                    <label htmlFor={tid} className="block text-sm font-medium text-foreground">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={tid}
                    rows={5}
                    className={cn(
                        "w-full rounded-lg border bg-card px-3 py-2 text-sm text-foreground",
                        "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                        error ? "border-destructive" : "border-border",
                        className,
                    )}
                    {...props}
                />
                {error && <p className="text-xs text-destructive">{error}</p>}
            </div>
        );
    }

TextArea.displayName = "TextArea";