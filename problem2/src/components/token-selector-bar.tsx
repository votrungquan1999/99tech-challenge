"use client";

import { ArrowLeftRight } from "lucide-react";
import { Button } from "src/components/ui/button";
import { useSelectedTokens } from "src/contexts/selected-tokens-context";
import { PreloadTokenIcons } from "./preload-token-icons";
import { TokenSelector } from "./token-selector";

export function TokenSelectorBar() {
	const { fromToken, toToken, setFromToken, setToToken, swapDirection } =
		useSelectedTokens();

	return (
		<>
			<PreloadTokenIcons />

			<div className="flex items-center gap-2 mb-6">
				<div className="flex-1">
					<TokenSelector
						selectedToken={fromToken}
						onSelectToken={setFromToken}
						label="Select token"
					/>
				</div>
				<Button
					type="button"
					variant="outline"
					size="icon"
					className="rounded-full shrink-0 shadow-md hover:shadow-lg transition-shadow"
					onClick={swapDirection}
					disabled={!fromToken && !toToken}
				>
					<ArrowLeftRight className="h-4 w-4" />
				</Button>
				<div className="flex-1">
					<TokenSelector
						selectedToken={toToken}
						onSelectToken={setToToken}
						label="Select token"
					/>
				</div>
			</div>
		</>
	);
}
