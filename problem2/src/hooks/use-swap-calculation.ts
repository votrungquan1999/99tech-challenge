"use client";

import { useInputValue } from "src/contexts/input-value-context";
import { useLocale } from "src/contexts/locale-context";
import { useSelectedTokens } from "src/contexts/selected-tokens-context";
import { useTokenPrice } from "src/contexts/token-price-context";
import {
	calculateSwap,
	formatWithLocale,
	normalizeDecimalInput,
} from "src/lib/calculations";

interface SwapCalculationResult {
	toAmount: string;
	calculationError: string | null;
}

export function useSwapCalculation(): SwapCalculationResult {
	const { fromAmount, inputError } = useInputValue();
	const { tokens } = useTokenPrice();
	const { fromToken, toToken } = useSelectedTokens();
	const { actualLocale } = useLocale();

	// If no amount entered or has input validation error, return empty
	if (!fromAmount || fromAmount.trim() === "" || inputError) {
		return { toAmount: "", calculationError: null };
	}

	// Validate token selection
	if (!fromToken) {
		return {
			toAmount: "",
			calculationError: "Please select a source token",
		};
	}

	if (!toToken) {
		return {
			toAmount: "",
			calculationError: "Please select a destination token",
		};
	}

	// If same token, just return the input value (1:1)
	if (fromToken === toToken) {
		return { toAmount: fromAmount, calculationError: null };
	}

	// Get token data
	const fromTokenData = tokens.find((t) => t.symbol === fromToken);
	const toTokenData = tokens.find((t) => t.symbol === toToken);

	if (!fromTokenData || !toTokenData) {
		return { toAmount: "", calculationError: "Token data not found" };
	}

	// Calculate swap
	const normalized = normalizeDecimalInput(fromAmount, actualLocale);
	const amount = Number.parseFloat(normalized);

	const result = calculateSwap(amount, fromTokenData, toTokenData);

	return {
		toAmount: formatWithLocale(result.toAmount, actualLocale),
		calculationError: null,
	};
}
