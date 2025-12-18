"use client";

import Image from "next/image";
import { memo } from "react";
import { useIcons } from "src/contexts/icons-context";
import { useTokenPrice } from "src/contexts/token-price-context";
import { getAllTokenIconUrls } from "src/lib/api-client";

/**
 * Preload all token icons using Next.js Image priority
 * This prevents icon flickering when user opens the token selector dialog
 */
export const PreloadTokenIcons = memo(function PreloadTokenIcons() {
	const { tokens } = useTokenPrice();
	const { availableIcons } = useIcons();

	// Generate all icon URLs for prefetching
	const iconUrls = getAllTokenIconUrls(tokens, availableIcons);

	return (
		<div className="hidden">
			{iconUrls.map((url) => (
				<Image key={url} src={url} alt="" width={20} height={20} />
			))}
		</div>
	);
});
