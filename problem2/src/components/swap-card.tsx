"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "src/components/ui/card";
import { ExchangeRateDisplay } from "./exchange-rate-display";
import { LocaleSelector } from "./locale-selector";
import { PriceRefreshDisplay } from "./price-refresh-display";
import { TokenInput } from "./token-input";
import { TokenOutput } from "./token-output";
import { TokenSelectorBar } from "./token-selector-bar";

export function SwapCard() {
	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Swap Tokens</CardTitle>
				<div className="flex items-center justify-between text-sm">
					<LocaleSelector />
					<PriceRefreshDisplay />
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					<TokenSelectorBar />

					<ExchangeRateDisplay />

					<div className="border-t border-border" />

					<TokenInput />

					<div className="border-t border-border" />

					<TokenOutput />
				</div>
			</CardContent>
		</Card>
	);
}
