"use client";

import { createContext, type ReactNode, useContext } from "react";

interface IconsContextValue {
	availableIcons: string[];
}

const IconsContext = createContext<IconsContextValue | undefined>(undefined);

interface IconsProviderProps {
	children: ReactNode;
	initialIcons: string[];
}

export function IconsProvider({ children, initialIcons }: IconsProviderProps) {
	return (
		<IconsContext.Provider value={{ availableIcons: initialIcons }}>
			{children}
		</IconsContext.Provider>
	);
}

export function useIcons() {
	const context = useContext(IconsContext);
	if (!context) {
		throw new Error("useIcons must be used within IconsProvider");
	}
	return context;
}
