import Image from "next/image";
import emblemPng from "@/app/icon.png"

type BrandSpinnerPreset = "sm" | "md" | "lg";

const SIZE_PRESETS: Record<BrandSpinnerPreset, number> = { sm: 20, md: 32, lg: 48 };

interface BrandSpinnerProps {
    /** "sm" (20px), "md" (32px), "lg" (48px), or an exact pixel size for any
     * in-between/larger use case. Defaults to "md". */
    size?: BrandSpinnerPreset | number;
    /** Color of the spinning track/arc — any text-color utility. */
    className?: string;
    /** Brand mark shown at the center. Only rendered at 24px and above — below
     * that a plain dot is used instead since the mark isn't legible that small. */
    markSrc?: string;
    markAlt?: string;
    /** Background color of the fallback center dot when no mark is shown. */
    dotClassName?: string;
    /** Optional text rendered next to the spinner, e.g. "Logging in...". */
    label?: string;
    labelClassName?: string;
}

export function BrandSpinner({
    size = "md",
    className = "text-secondary",
    markSrc,
    markAlt = "Loading",
    dotClassName = "bg-tertiary",
    label,
    labelClassName = "font-label-lg text-label-lg",
}: BrandSpinnerProps) {
    const px = typeof size === "number" ? size : SIZE_PRESETS[size];
    const strokeWidth = 2;
    const showMark = px >= 24 && Boolean(markSrc);
    const markSize = px * 0.56;
    const dotSize = Math.max(Math.round(px * 0.3), 6);

    return (
        <span className="inline-flex flex-col items-center gap-2" role="status" aria-live="polite">
            <span
                className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
                style={{ width: px, height: px }}
            >
                <svg className="animate-spin w-full h-full" fill="none" viewBox="0 0 24 24">
                    <circle
                        className="opacity-20"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                    />
                    <path
                        className="opacity-90"
                                            d="M12 2a10 10 0 0110 10"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={strokeWidth}
                                            strokeLinecap="round"
                    />
                </svg>

                <span className="absolute inset-0 flex items-center justify-center">
                    {showMark ? (
                        <span
                            className="relative block shrink-0"
                            style={{ width: markSize, height: markSize }}
                        >
                            <Image
                                src={markSrc ?? emblemPng}
                                alt={markAlt}
                                className="w-full h-full object-contain"
                                width={px}
                                height={px}
                            />
                        </span>
                    ) : (
                        <span
                            className={`rounded-full ${dotClassName}`}
                            style={{ width: dotSize, height: dotSize }}
                        />
                    )}
                </span>
            </span>

            {label && <span className={labelClassName}>{label}</span>}
            <span className="sr-only">Loading</span>
        </span>
    );
}