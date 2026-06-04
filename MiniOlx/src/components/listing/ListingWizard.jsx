import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import toast from "react-hot-toast";
import {
    fullListingSchema,
    stepBasicSchema,
    stepPricingSchema,
    stepConditionSchema,
    stepImagesSchema,
} from "../../lib/validation/schemas";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { TextArea } from "../ui/TextArea";
import { Select } from "../ui/Select";
import { ImageUploader } from "../ui/ImageUploader";
import { CATEGORIES, CONDITIONS, formatPrice, categoryLabel, conditionLabel } from "../../lib/constants";
import { cn } from "../../lib/utils";


const STEPS = ["Basics", "Pricing", "Details", "Photos", "Review"];
const stepSchemas = [stepBasicSchema, stepPricingSchema, stepConditionSchema, stepImagesSchema, fullListingSchema];

export function ListingWizard({ defaultValues, submitLabel = "Publish listing", onSubmit }) {
    const [step, setStep] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    const form = useForm({
        resolver: zodResolver(
            stepSchemas[step]
        ),
        mode: "onTouched",
        defaultValues: {
            title: "",
            description: "",
            category: "",
            price: 0,
            negotiable: false,
            condition: "good",
            location: "",
            images: [],
            ...defaultValues,
        },
    });

    const { register, handleSubmit, formState: { errors }, watch, setValue, trigger, getValues } = form;
    const values = watch();

    const next = useCallback(async () => {
        const ok = await trigger();
        if (!ok) return;
        setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }, [trigger]);

    const prev = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);

    const submit = handleSubmit(async (data) => {
        const parsed = fullListingSchema.safeParse(data);
        if (!parsed.success) {
            toast.error("Please complete all required fields");
            return;
        }
        setSubmitting(true);
        try {
            await onSubmit(parsed.data);
        } finally {
            setSubmitting(false);
        }
    });

    return (
        <div className="space-y-6">
            <Stepper step={step} onStepClick={(i) => i <= step && setStep(i)} />

            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                {step === 0 && (
                    <div className="space-y-4">
                        <Input label="Title" placeholder="e.g. iPhone 13 Pro 256GB" {...register("title")} error={errors.title?.message} />
                        <Select label="Category" placeholder="Select a category" options={CATEGORIES} {...register("category")} error={errors.category?.message} />
                        <TextArea label="Description" placeholder="Describe your item, include any defects..." {...register("description")} error={errors.description?.message} />
                    </div>
                )}

                {step === 1 && (
                    <div className="space-y-4">
                        <Input
                            label="Price (USD)"
                            type="number"
                            min={1}
                            step="1"
                            {...register("price", { valueAsNumber: true })}
                            error={errors.price?.message}
                        />
                        <label className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-sm">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-border text-primary"
                                checked={values.negotiable}
                                onChange={(e) => setValue("negotiable", e.target.checked, { shouldDirty: true })}
                            />
                            <span>Price is negotiable</span>
                        </label>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <Select label="Condition" options={CONDITIONS} {...register("condition")} error={errors.condition?.message} />
                        <Input label="Location" placeholder="City, State" {...register("location")} error={errors.location?.message} />
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Photos</label>
                        <ImageUploader value={values.images || []} onChange={(urls) => setValue("images", urls, { shouldDirty: true, shouldValidate: true })} />
                        {errors.images && <p className="text-xs text-destructive">{errors.images?.message}</p>}
                    </div>
                )}

                {step === 4 && <ReviewStep values={getValues()} onEdit={setStep} />}

                <div className="flex items-center justify-between border-t border-border pt-4">
                    <Button type="button" variant="outline" onClick={prev} disabled={step === 0 || submitting}>Back</Button>
                    {step < STEPS.length - 1 ? (
                        <Button type="button" onClick={next}>Continue</Button>
                    ) : (
                        <Button type="button" onClick={submit} loading={submitting}>{submitLabel}</Button>
                    )}
                </div>
            </form>
        </div>
    );
}

function Stepper({
    step,
    onStepClick,
}) {
    return (
        <div className="flex items-center justify-between gap-2">
            {STEPS.map((label, i) => {
                const active = i === step;
                const done = i < step;
                return (
                    <button
                        key={label}
                        type="button"
                        onClick={() => onStepClick(i)}
                        className="flex flex-1 flex-col items-center gap-1.5"
                    >
                        <div className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                            active && "bg-primary text-primary-foreground",
                            done && "bg-success text-success-foreground",
                            !active && !done && "bg-muted text-muted-foreground",
                        )}>
                            {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                        </div>
                        <span className={cn("hidden text-xs sm:block", active ? "font-medium text-foreground" : "text-muted-foreground")}>{label}</span>
                    </button>
                );
            })}
        </div>
    );
}

function ReviewStep({
    values,
    onEdit,
}) {
    const Row = ({
        label,
        value,
        step,
    }) => (
        <div className="flex items-start justify-between gap-4 border-b border-border py-3 last:border-0">
            <div className="min-w-0 flex-1">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
                <div className="mt-0.5 break-words text-sm text-foreground">{value}</div>
            </div>
            <button type="button" onClick={() => onEdit(step)} className="text-xs text-primary hover:underline">Edit</button>
        </div>
    );

    return (
        <div className="rounded-xl border border-border bg-card p-4">
            <Row label="Title" value={values.title} step={0} />
            <Row label="Category" value={categoryLabel(values.category)} step={0} />
            <Row label="Description" value={values.description} step={0} />
            <Row label="Price" value={`${formatPrice(values.price)}${values.negotiable ? " · Negotiable" : ""}`} step={1} />
            <Row label="Condition" value={conditionLabel(values.condition)} step={2} />
            <Row label="Location" value={values.location} step={2} />
            <Row
                label={`Photos (${values.images.length})`}
                value={
                    <div className="mt-1 grid grid-cols-4 gap-2">
                        {values.images.slice(0, 8).map((src) => (
                            <img key={src} src={src} alt="" className="aspect-square rounded-md object-cover" />
                        ))}
                    </div>
                }
                step={3}
            />
        </div>
    );
}