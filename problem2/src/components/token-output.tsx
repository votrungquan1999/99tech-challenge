"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "src/components/ui/button";
import { Label } from "src/components/ui/label";
import { useSwapCalculation } from "src/hooks/use-swap-calculation";

export function TokenOutput() {
	const { toAmount, calculationError } = useSwapCalculation();
	const [copied, setCopied] = useState(false);

	async function handleCopy() {
		if (!toAmount) return;

		try {
			await navigator.clipboard.writeText(toAmount);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (error) {
			console.error("Failed to copy:", error);
		}
	}

	return (
		<div className="space-y-2">
			<Label className="text-sm font-medium text-muted-foreground">
				You receive
			</Label>
			<div className="flex flex-col items-center">
				<div className="flex items-center gap-3">
					<div
						className={`text-5xl font-bold text-center ${
							toAmount ? "text-foreground" : "text-muted-foreground"
						}`}
					>
						{toAmount || "—"}
					</div>
					{toAmount && (
						<Button
							variant="ghost"
							size="icon"
							onClick={handleCopy}
							className="h-10 w-10 shrink-0"
							title={copied ? "Copied!" : "Copy to clipboard"}
						>
							{copied ? (
								<Check className="h-5 w-5 text-green-500" />
							) : (
								<Copy className="h-5 w-5" />
							)}
						</Button>
					)}
				</div>
				<p
					className={`text-sm text-red-500 mt-2 text-center min-h-[1.25rem] ${
						calculationError ? "visible" : "invisible"
					}`}
				>
					{calculationError || "\u00A0"}
				</p>
			</div>
		</div>
	);
}
