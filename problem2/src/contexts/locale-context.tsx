"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

export enum LocaleStyle {
	US = "en-US",
	EU = "de-DE",
	Auto = "auto",
}

interface LocaleContextValue {
	localeStyle: LocaleStyle;
	setLocaleStyle: (style: LocaleStyle) => void;
	actualLocale: string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocale() {
	const context = useContext(LocaleContext);
	if (!context) {
		throw new Error("useLocale must be used within LocaleProvider");
	}
	return context;
}

interface LocaleProviderProps {
	children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
	const [localeStyle, setLocaleStyle] = useState<LocaleStyle>(LocaleStyle.US);
	const [browserLocale, setBrowserLocale] = useState<string>("en-US");

	// Detect browser locale on mount
	useEffect(() => {
		if (typeof window !== "undefined" && navigator.language) {
			setBrowserLocale(navigator.language);
		}
	}, []);

	// Calculate the actual locale to use for formatting
	const actualLocale =
		localeStyle === LocaleStyle.Auto ? browserLocale : localeStyle;

	return (
		<LocaleContext.Provider
			value={{
				localeStyle,
				setLocaleStyle,
				actualLocale,
			}}
		>
			{children}
		</LocaleContext.Provider>
	);
}
