"use client";

import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { useInputValue } from "src/contexts/input-value-context";

export function TokenInput() {
	const { fromAmount, setFromAmount, inputError } = useInputValue();

	return (
		<div className="space-y-2">
			<Label className="text-sm font-medium text-muted-foreground">
				You pay
			</Label>
			<div className="flex flex-col items-center">
				<Input
					type="text"
					placeholder="Enter amount"
					value={fromAmount}
					onChange={(e) => setFromAmount(e.target.value)}
					className={`text-center text-xl font-semibold h-auto py-2 border border-border rounded-lg focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 ${
						inputError ? "text-red-500 border-red-500" : ""
					}`}
				/>
				<p
					className={`text-sm text-red-500 mt-2 text-center min-h-5 ${
						inputError ? "visible" : "invisible"
					}`}
				>
					{inputError || "\u00A0"}
				</p>
			</div>
		</div>
	);
}
