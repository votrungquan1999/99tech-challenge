"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "src/components/ui/button";
import { useTokenPrice } from "src/contexts/token-price-context";
import { StalenessLevel } from "src/lib/utils";

export function PriceRefreshDisplay() {
	const { stalenessLevel, formattedTimestamp, isRefreshing, refreshPrices } =
		useTokenPrice();

	const getStalenessColor = (level: StalenessLevel) => {
		switch (level) {
			case StalenessLevel.Fresh:
				return "text-green-600 dark:text-green-400";
			case StalenessLevel.Stale:
				return "text-amber-600 dark:text-amber-400";
			case StalenessLevel.VeryStale:
				return "text-red-600 dark:text-red-400";
		}
	};

	return (
		<div className="flex items-center gap-2">
			<div
				className={`text-xs ${getStalenessColor(stalenessLevel)} text-right`}
			>
				<div>Last updated</div>
				<div className="font-medium">{formattedTimestamp}</div>
			</div>
			<Button
				variant="ghost"
				size="icon"
				onClick={refreshPrices}
				disabled={isRefreshing}
			>
				<RefreshCw
					className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
				/>
			</Button>
		</div>
	);
}
