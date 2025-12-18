"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

interface SelectedTokensContextValue {
	fromToken: string | null;
	toToken: string | null;
	setFromToken: (token: string) => void;
	setToToken: (token: string) => void;
	swapDirection: () => void;
}

const SelectedTokensContext = createContext<SelectedTokensContextValue | null>(
	null,
);

export function useSelectedTokens() {
	const context = useContext(SelectedTokensContext);
	if (!context) {
		throw new Error(
			"useSelectedTokens must be used within SelectedTokensProvider",
		);
	}
	return context;
}

interface SelectedTokensProviderProps {
	children: ReactNode;
}

export function SelectedTokensProvider({
	children,
}: SelectedTokensProviderProps) {
	const [fromToken, setFromToken] = useState<string | null>(null);
	const [toToken, setToToken] = useState<string | null>(null);

	const swapDirection = () => {
		// Swap only the tokens, keep the input amount unchanged
		setFromToken(toToken);
		setToToken(fromToken);
	};

	return (
		<SelectedTokensContext.Provider
			value={{
				fromToken,
				toToken,
				setFromToken,
				setToToken,
				swapDirection,
			}}
		>
			{children}
		</SelectedTokensContext.Provider>
	);
}
