"use client";

import Image from "next/image";
import { useIcons } from "src/contexts/icons-context";
import { getExactIconFilename, getTokenIconUrl } from "src/lib/api-client";

interface TokenIconProps {
	symbol: string;
	size?: number;
	className?: string;
}

export function TokenIcon({ symbol, size = 20, className }: TokenIconProps) {
	const { availableIcons } = useIcons();

	// Find the exact filename (case-insensitive match)

	const exactFilename = getExactIconFilename(symbol, availableIcons);
	const iconUrl = exactFilename
		? getTokenIconUrl(exactFilename)
		: getTokenIconUrl(symbol);

	return (
		<Image
			src={iconUrl}
			alt={symbol.toUpperCase()}
			width={size}
			height={size}
			className={className}
		/>
	);
}
