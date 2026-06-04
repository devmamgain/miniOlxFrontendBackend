import { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { cn } from "../../lib/utils";

export function ProductGallery({
    images,
    title,
}) {
    const [idx, setIdx] =
        useState(0);

    if (!images.length) {
        return (
            <div className="flex aspect-square items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
                No images
            </div>
        );
    }

    const prev = () => {
        setIdx(
            (current) =>
                (current -
                    1 +
                    images.length) %
                images.length
        );
    };

    const next = () => {
        setIdx(
            (current) =>
                (current + 1) %
                images.length
        );
    };

    return (
        <div className="space-y-3">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
                <img
                    src={images[idx]}
                    alt={title}
                    className="h-full w-full object-cover"
                />

                {images.length >
                    1 && (
                        <>
                            <button
                                onClick={prev}
                                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-card/90 p-2 shadow hover:bg-card"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>

                            <button
                                onClick={next}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-card/90 p-2 shadow hover:bg-card"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </>
                    )}
            </div>

            {images.length >
                1 && (
                    <div className="flex gap-2 overflow-x-auto">
                        {images.map(
                            (
                                src,
                                index
                            ) => (
                                <button
                                    key={
                                        src +
                                        index
                                    }
                                    onClick={() =>
                                        setIdx(
                                            index
                                        )
                                    }
                                    className={cn(
                                        "h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2",
                                        index ===
                                            idx
                                            ? "border-primary"
                                            : "border-transparent opacity-70 hover:opacity-100"
                                    )}
                                >
                                    <img
                                        src={src}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            )
                        )}
                    </div>
                )}
        </div>
    );
}