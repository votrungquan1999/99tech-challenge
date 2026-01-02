import { SwapCard } from "src/components/swap-card";
import { IconsProvider } from "src/contexts/icons-context";
import { InputValueProvider } from "src/contexts/input-value-context";
import { LocaleProvider } from "src/contexts/locale-context";
import { SelectedTokensProvider } from "src/contexts/selected-tokens-context";
import { TokenPriceProvider } from "src/contexts/token-price-context";
import { fetchAvailableIcons, fetchTokenPrices } from "src/lib/api-server";
import { UseUseCallbackToMemo } from "src/useCallbackToMemo";

export default async function Home() {
	"use cache";

	// Fetch prices and icons in parallel
	const [tokens, availableIcons] = await Promise.all([
		fetchTokenPrices(),
		fetchAvailableIcons(),
	]);
	const fetchedAt = new Date().toISOString();

	return <UseUseCallbackToMemo />;

	return (
		<div className="flex min-h-screen items-center justify-center bg-linear-to-br from-background to-muted p-4">
			<LocaleProvider>
				<TokenPriceProvider
					initialTokens={tokens ?? []}
					initialFetchedAt={fetchedAt}
				>
					<IconsProvider initialIcons={availableIcons ?? []}>
						<SelectedTokensProvider>
							<InputValueProvider>
								<SwapCard />
							</InputValueProvider>
						</SelectedTokensProvider>
					</IconsProvider>
				</TokenPriceProvider>
			</LocaleProvider>
		</div>
	);
}
