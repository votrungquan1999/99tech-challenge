"use client";

import { useLocale } from "src/contexts/locale-context";
import { useSelectedTokens } from "src/contexts/selected-tokens-context";
import { useTokenPrice } from "src/contexts/token-price-context";
import { formatWithLocale } from "src/lib/calculations";

export function ExchangeRateDisplay() {
	return (
		<div className="text-lg text-center py-2 min-h-8 flex items-center justify-center">
			<ExchangeRateMessage />
		</div>
	);
}

function ExchangeRateMessage() {
	const { fromToken, toToken } = useSelectedTokens();
	const { tokens } = useTokenPrice();
	const { actualLocale } = useLocale();

	if (!fromToken || !toToken) {
		return (
			<span className="font-medium text-muted-foreground">
				Select tokens to see exchange rate
			</span>
		);
	}

	if (fromToken === toToken) {
		return (
			<span className="font-medium text-amber-600 dark:text-amber-400">
				You are swapping between the same token (1:1)
			</span>
		);
	}

	const fromTokenData = tokens.find((t) => t.symbol === fromToken);
	const toTokenData = tokens.find((t) => t.symbol === toToken);

	if (fromTokenData && toTokenData) {
		const rate = fromTokenData.price / toTokenData.price;
		return (
			<span className="font-medium text-muted-foreground">
				1 {fromToken.toUpperCase()} = {formatWithLocale(rate, actualLocale)}{" "}
				{toToken.toUpperCase()}
			</span>
		);
	}

	return (
		<span className="font-medium text-amber-600 dark:text-amber-400">
			Selected tokens not valid
		</span>
	);
}
