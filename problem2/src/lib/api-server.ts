import type { Token, TokenPrice } from "src/types";

const PRICES_API_URL = "https://interview.switcheo.com/prices.json";

interface GitHubFile {
	name: string;
	path: string;
	type: string;
}

/**
 * Fetch token prices from Switcheo API
 * Deduplicates by using the latest price for each token based on timestamp
 * Returns null if fetch fails (for graceful error handling)
 */
export async function fetchTokenPrices(): Promise<Token[] | null> {
	try {
		// Simulate network delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const response = await fetch(PRICES_API_URL);

		if (!response.ok) {
			return null;
		}

		const prices: TokenPrice[] = await response.json();

		// Deduplicate by keeping the latest price for each token
		const tokenMap = new Map<string, Token>();

		for (const item of prices) {
			const existing = tokenMap.get(item.currency);

			if (!existing || new Date(item.date) > new Date(existing.lastUpdated)) {
				tokenMap.set(item.currency, {
					symbol: item.currency,
					price: item.price,
					lastUpdated: item.date,
				});
			}
		}

		return Array.from(tokenMap.values()).sort((a, b) =>
			a.symbol.localeCompare(b.symbol),
		);
	} catch {
		return null;
	}
}

/**
 * Fetch all available icon filenames from GitHub
 * Returns null if fetch fails (for graceful error handling)
 */
export async function fetchAvailableIcons(): Promise<string[] | null> {
	try {
		// Simulate network delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const response = await fetch(
			"https://api.github.com/repos/Switcheo/token-icons/contents/tokens",
			{
				headers: {
					Accept: "application/vnd.github.v3+json",
				},
			},
		);

		if (!response.ok) {
			return null;
		}

		const files: GitHubFile[] = await response.json();
		return files
			.filter((file) => file.type === "file" && file.name.endsWith(".svg"))
			.map((file) => file.name.replace(".svg", ""));
	} catch {
		return null;
	}
}
