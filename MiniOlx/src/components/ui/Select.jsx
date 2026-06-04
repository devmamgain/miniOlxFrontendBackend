import { forwardRef } from "react";
import { cn } from "../../lib/utils";


export const Select =
    ({ className, label, error, options, placeholder, id, ...props }, ref) => {
        const sid = id || props.name;
        return (
            <div className="space-y-1.5">
                {label && (
                    <label htmlFor={sid} className="block text-sm font-medium text-foreground">{label}</label>
                )}
                <select
                    ref={ref}
                    id={sid}
                    className={cn(
                        "h-10 w-full rounded-lg border bg-card px-3 text-sm text-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring",
                        error ? "border-destructive" : "border-border",
                        className,
                    )}
                    {...props}
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>
                {error && <p className="text-xs text-destructive">{error}</p>}
            </div>
        );
    }

Select.displayName = "Select";