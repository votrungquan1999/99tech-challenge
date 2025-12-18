"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import { validateNumberInput } from "src/lib/calculations";
import { useLocale } from "./locale-context";

interface InputValueContextValue {
	fromAmount: string;
	setFromAmount: (amount: string) => void;
	inputError: string | null;
}

const InputValueContext = createContext<InputValueContextValue | null>(null);

export function useInputValue() {
	const context = useContext(InputValueContext);
	if (!context) {
		throw new Error("useInputValue must be used within InputValueProvider");
	}
	return context;
}

interface InputValueProviderProps {
	children: ReactNode;
}

export function InputValueProvider({ children }: InputValueProviderProps) {
	const [fromAmount, setFromAmount] = useState<string>("");
	const [inputError, setInputError] = useState<string | null>(null);
	const { actualLocale } = useLocale();

	function handleInputChange(value: string) {
		setFromAmount(value);

		if (value.trim() === "") {
			setInputError("Please enter an amount.");
		} else {
			setInputError(validateNumberInput(value, actualLocale));
		}
	}

	return (
		<InputValueContext.Provider
			value={{
				fromAmount,
				setFromAmount: handleInputChange,
				inputError,
			}}
		>
			{children}
		</InputValueContext.Provider>
	);
}
