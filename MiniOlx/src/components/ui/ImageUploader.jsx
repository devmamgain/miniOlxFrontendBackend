import { useCallback, useRef, useState } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {
    ALLOWED_IMAGE_TYPES,
    MAX_IMAGE_SIZE,
    MAX_IMAGES,
} from "../../lib/validation/schemas";
import { uploadApi } from "../../api/uploadApi";
import { cn } from "../../lib/utils";

export function ImageUploader({
    value,
    onChange,
    max = MAX_IMAGES,
}) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [dragOver, setDragOver] = useState(false);

    const inputRef = useRef(null);

    const validate = useCallback((files) => {
        const valid = [];

        for (const file of files) {
            if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
                toast.error(`${file.name}: unsupported type`);
                continue;
            }

            if (file.size > MAX_IMAGE_SIZE) {
                toast.error(`${file.name}: exceeds 5MB`);
                continue;
            }

            valid.push(file);
        }

        return valid;
    }, []);

    const handleFiles = useCallback(
        async (files) => {
            const remaining = max - value.length;

            if (remaining <= 0) {
                toast.error(`Maximum ${max} images`);
                return;
            }

            const valid = validate(files).slice(0, remaining);

            if (!valid.length) return;

            setUploading(true);
            setProgress(0);

            try {
                const res = await uploadApi.uploadImages(valid, setProgress);

                onChange([...value, ...res.urls]);

                toast.success("Images uploaded");
            } catch (error) {
                toast.error("Upload failed");
            } finally {
                setUploading(false);
                setProgress(0);
            }
        },
        [max, onChange, validate, value]
    );

    const removeAt = (idx) => {
        onChange(value.filter((_, i) => i !== idx));
    };

    const move = (from, to) => {
        if (to < 0 || to >= value.length) return;

        const arr = [...value];
        const [item] = arr.splice(from, 1);

        arr.splice(to, 0, item);

        onChange(arr);
    };

    return (
        <div className="space-y-3">
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    handleFiles(Array.from(e.dataTransfer.files));
                }}
                onClick={() => inputRef.current?.click()}
                className={cn(
                    "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors",
                    dragOver
                        ? "border-primary bg-accent"
                        : "border-border bg-muted/40 hover:bg-muted"
                )}
            >
                {uploading ? (
                    <>
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        <p className="mt-2 text-sm text-muted-foreground">
                            Uploading {progress}%
                        </p>
                    </>
                ) : (
                    <>
                        <ImagePlus className="h-7 w-7 text-muted-foreground" />
                        <p className="mt-2 text-sm font-medium">
                            Drag & drop or click to upload
                        </p>
                        <p className="text-xs text-muted-foreground">
                            JPG, PNG, WEBP up to 5MB · max {max} images
                        </p>
                    </>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    accept={ALLOWED_IMAGE_TYPES.join(",")}
                    multiple
                    hidden
                    onChange={(e) => {
                        const files = e.target.files
                            ? Array.from(e.target.files)
                            : [];

                        handleFiles(files);

                        e.target.value = "";
                    }}
                />
            </div>

            {value.length > 0 && (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {value.map((url, idx) => (
                        <div
                            key={`${url}-${idx}`}
                            className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
                        >
                            <img
                                src={url}
                                alt=""
                                className="h-full w-full object-cover"
                            />

                            {idx === 0 && (
                                <span className="absolute left-1 top-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                                    Cover
                                </span>
                            )}

                            <button
                                type="button"
                                onClick={() => removeAt(idx)}
                                className="absolute right-1 top-1 rounded-full bg-foreground/70 p-1 text-background opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <X className="h-3 w-3" />
                            </button>

                            <div className="absolute inset-x-1 bottom-1 flex justify-between opacity-0 transition-opacity group-hover:opacity-100">
                                <button
                                    type="button"
                                    onClick={() => move(idx, idx - 1)}
                                    className="rounded bg-foreground/70 px-1.5 text-xs text-background"
                                >
                                    ‹
                                </button>

                                <button
                                    type="button"
                                    onClick={() => move(idx, idx + 1)}
                                    className="rounded bg-foreground/70 px-1.5 text-xs text-background"
                                >
                                    ›
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}