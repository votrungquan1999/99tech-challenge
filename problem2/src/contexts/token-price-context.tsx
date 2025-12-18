"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import { revalidateServerCache } from "src/actions/revalidate-cache";
import { fetchTokenPrices } from "src/lib/api-server";
import {
	formatTimestamp,
	getStalenessLevel,
	type StalenessLevel,
} from "src/lib/utils";
import type { Token } from "src/types";
import { useLocale } from "./locale-context";

interface TokenPriceContextValue {
	tokens: Token[];
	fetchedAt: string;
	stalenessLevel: StalenessLevel;
	formattedTimestamp: string;
	isRefreshing: boolean;
	refreshPrices: () => Promise<void>;
}

const TokenPriceContext = createContext<TokenPriceContextValue | null>(null);

export function useTokenPrice() {
	const context = useContext(TokenPriceContext);
	if (!context) {
		throw new Error("useTokenPrice must be used within TokenPriceProvider");
	}
	return context;
}

interface TokenPriceProviderProps {
	children: ReactNode;
	initialTokens: Token[];
	initialFetchedAt: string;
}

export function TokenPriceProvider({
	children,
	initialTokens,
	initialFetchedAt,
}: TokenPriceProviderProps) {
	const [tokens, setTokens] = useState<Token[]>(initialTokens);
	const [fetchedAt, setFetchedAt] = useState<string>(initialFetchedAt);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const { actualLocale } = useLocale();

	async function refreshPrices() {
		setIsRefreshing(true);
		await revalidateServerCache();
		const newPrices = await fetchTokenPrices();
		if (newPrices) {
			setTokens(newPrices);
			setFetchedAt(new Date().toISOString());
		}
		setIsRefreshing(false);
	}

	const stalenessLevel = getStalenessLevel(fetchedAt);
	const formattedTimestamp = formatTimestamp(fetchedAt, actualLocale);

	const value: TokenPriceContextValue = {
		tokens,
		fetchedAt,
		stalenessLevel,
		formattedTimestamp,
		isRefreshing,
		refreshPrices,
	};

	return (
		<TokenPriceContext.Provider value={value}>
			{children}
		</TokenPriceContext.Provider>
	);
}
