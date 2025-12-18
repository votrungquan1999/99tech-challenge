import type { Token } from "src/types";

const TOKEN_ICONS_BASE_URL =
	"https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens";

/**
 * Get the exact icon filename for a token symbol (case-insensitive match)
 */
export function getExactIconFilename(
	symbol: string,
	availableIcons: string[],
): string | null {
	const match = availableIcons.find(
		(filename) => filename.toLowerCase() === symbol.toLowerCase(),
	);
	return match || null;
}

/**
 * Get icon URL for a token symbol
 */
export function getTokenIconUrl(symbol: string): string {
	return `${TOKEN_ICONS_BASE_URL}/${symbol}.svg`;
}

/**
 * Generate all icon URLs for tokens with exact filename matching
 */
export function getAllTokenIconUrls(
	tokens: Token[],
	availableIcons: string[],
): string[] {
	return tokens.map((token) => {
		const exactFilename = getExactIconFilename(token.symbol, availableIcons);
		return getTokenIconUrl(exactFilename || token.symbol);
	});
}
