"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "src/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "src/components/ui/dialog";
import { Input } from "src/components/ui/input";
import { useTokenPrice } from "src/contexts/token-price-context";
import { cn } from "src/lib/utils";
import { TokenIcon } from "./token-icon";

interface TokenSelectorProps {
	selectedToken: string | null;
	onSelectToken: (symbol: string) => void;
	label: string;
	disabled?: boolean;
}

export function TokenSelector({
	selectedToken,
	onSelectToken,
	label,
	disabled,
}: TokenSelectorProps) {
	const { tokens } = useTokenPrice();
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");

	const selectedTokenData = tokens.find((t) => t.symbol === selectedToken);

	const filteredTokens = tokens.filter((token) =>
		token.symbol.toLowerCase().includes(search.toLowerCase()),
	);

	const handleSelect = (symbol: string) => {
		onSelectToken(symbol);
		setOpen(false);
		setSearch("");
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						"w-full justify-between",
						!selectedToken && "text-muted-foreground",
					)}
					disabled={disabled}
				>
					{selectedTokenData ? (
						<div className="flex items-center gap-2 min-w-0 flex-1">
							<TokenIcon
								symbol={selectedTokenData.symbol}
								size={20}
								className="rounded-full shrink-0"
							/>
							<span className="truncate">{selectedTokenData.symbol.toUpperCase()}</span>
						</div>
					) : (
						<span>{label}</span>
					)}
					<ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Select Token</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<Input
						placeholder="Search tokens..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						autoFocus
					/>
					<div className="max-h-[300px] overflow-y-auto space-y-1">
						{filteredTokens.length === 0 ? (
							<p className="text-sm text-muted-foreground text-center py-4">
								No tokens found
							</p>
						) : (
							filteredTokens.map((token) => (
								<button
									type="button"
									key={token.symbol}
									onClick={() => handleSelect(token.symbol)}
									className={cn(
										"w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors",
										selectedToken === token.symbol && "bg-accent",
									)}
								>
									<TokenIcon
										symbol={token.symbol}
										size={32}
										className="rounded-full"
									/>
									<div className="flex-1 text-left">
										<div className="font-medium">{token.symbol.toUpperCase()}</div>
										<div className="text-sm text-muted-foreground">
											${token.price.toFixed(2)}
										</div>
									</div>
								</button>
							))
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
