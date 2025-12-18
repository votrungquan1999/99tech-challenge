import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export enum StalenessLevel {
	Fresh = "fresh",
	Stale = "stale",
	VeryStale = "very-stale",
}

/**
 * Calculate staleness level based on data age
 * - fresh: < 5 minutes
 * - amber: 5-15 minutes
 * - red: > 15 minutes
 */
export function getStalenessLevel(timestamp: string): StalenessLevel {
	const now = Date.now();
	const dataTime = new Date(timestamp).getTime();
	const ageMinutes = (now - dataTime) / 1000 / 60;

	if (ageMinutes < 5) return StalenessLevel.Fresh;
	if (ageMinutes < 15) return StalenessLevel.Stale;
	return StalenessLevel.VeryStale;
}

/**
 * Format timestamp for display
 */
export function formatTimestamp(timestamp: string, locale: string): string {
	const date = new Date(timestamp);
	return date.toLocaleString(locale, {
		dateStyle: "short",
		timeStyle: "short",
	});
}
