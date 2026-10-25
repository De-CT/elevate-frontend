import type { PackageOccurrence } from "@/store/useAppStore";

export function getOccurrenceUnit(occurrence: PackageOccurrence | undefined): string {
  if (occurrence === "WEEKLY") return "week";
  if (occurrence === "MONTHLY") return "month";
  return "contribution period";
}

export function getOccurrenceAdjective(occurrence: PackageOccurrence | undefined): string {
  if (occurrence === "WEEKLY") return "weekly";
  if (occurrence === "MONTHLY") return "monthly";
  return "per-period";
}

export function formatPackageDuration(
  duration: number,
  occurrence: PackageOccurrence | undefined
): string {
  if (!occurrence) {
    return `${duration} contribution period${duration === 1 ? "" : "s"}`;
  }
  const unit = getOccurrenceUnit(occurrence);
  return `${duration} ${unit}${duration === 1 ? "" : "s"}`;
}
