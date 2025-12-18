import type { SwapResult, Token } from "src/types";

/**
 * Calculate swap from one token to another via USD intermediary
 * Formula: fromAmount / fromTokenPrice * toTokenPrice
 *
 * @param fromAmount - Amount of source token
 * @param fromToken - Source token data
 * @param toToken - Destination token data
 * @returns Swap result with calculated amount and exchange rate
 */
export function calculateSwap(
	fromAmount: number,
	fromToken: Token,
	toToken: Token,
): SwapResult {
	// Convert fromToken to USD, then USD to toToken
	const usdAmount = fromAmount * fromToken.price;
	const toAmount = usdAmount / toToken.price;

	// Exchange rate: how many toTokens per 1 fromToken
	const exchangeRate = fromToken.price / toToken.price;

	return {
		// Assuming only used for demonstration purpose, no need very high precision
		toAmount: Number(toAmount.toFixed(3)), // Precision: 3 decimal places
		exchangeRate,
		fromToken: fromToken.symbol,
		toToken: toToken.symbol,
	};
}

/**
 * Get decimal separator for a given locale
 */
function getDecimalSeparator(locale: string): string {
	const formatted = new Intl.NumberFormat(locale).format(1.1);
	return formatted.charAt(1); // The separator is always at position 1 in "1.1" or "1,1"
}

/**
 * Normalize user input from locale format to standard dot notation
 * Handles thousands separators based on the locale's formatting:
 * - en-US: commas are thousands separators (strip them), dots are decimals
 * - de-DE: dots are thousands separators (strip them), commas are decimals
 *
 * @param value - User input string
 * @param locale - User's locale (e.g., 'en-US', 'de-DE', 'en-IN')
 * @returns Normalized number string with dot delimiter
 */
export function normalizeDecimalInput(value: string, locale: string): string {
	const decimalSeparator = getDecimalSeparator(locale);

	if (decimalSeparator === ",") {
		// When comma is decimal separator (e.g., de-DE):
		// Remove dots (thousands separators) and replace comma with dot
		return value.replace(/\./g, "").replace(",", ".");
	}
	// When dot is decimal separator (e.g., en-US, en-IN):
	// Remove commas (thousands separators)
	return value.replace(/,/g, "");
}

/**
 * Format output number with user's locale and thousands separators using Intl.NumberFormat
 * - en-US: 1,234.567
 * - de-DE: 1.234,567
 * - en-IN: 12,34,567.890 (Indian numbering system)
 *
 * @param value - Number to format
 * @param locale - User's locale (e.g., 'en-US', 'de-DE', 'en-IN')
 * @returns Formatted string with locale-specific thousands separators and decimal point
 */
export function formatWithLocale(value: number, locale: string): string {
	const formatter = new Intl.NumberFormat(locale, {
		minimumFractionDigits: 3,
		maximumFractionDigits: 3,
	});

	return formatter.format(value);
}

/**
 * Validate numeric input
 *
 * @param value - Input string
 * @param locale - User's locale
 * @returns Error message or null if valid
 */
export function validateNumberInput(
	value: string,
	locale: string,
): string | null {
	if (!value || value.trim() === "") {
		return "Please enter an amount";
	}

	// Normalize to dot notation for validation
	const normalized = normalizeDecimalInput(value, locale);

	// Check if it's a valid number
	const num = Number.parseFloat(normalized);
	if (Number.isNaN(num)) {
		return "Please enter a valid number";
	}

	// Check if positive
	if (num <= 0) {
		return "Amount must be greater than zero";
	}

	return null;
}
