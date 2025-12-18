"use client";

import { Label } from "src/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "src/components/ui/select";
import { LocaleStyle, useLocale } from "src/contexts/locale-context";

export function LocaleSelector() {
	const { localeStyle, setLocaleStyle } = useLocale();

	return (
		<div>
			<Label htmlFor="locale" className="text-xs text-muted-foreground">
				Number format
			</Label>
			<Select
				value={localeStyle}
				onValueChange={(value) => setLocaleStyle(value as LocaleStyle)}
			>
				<SelectTrigger id="locale" className="w-[140px] h-8">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value={LocaleStyle.US}>US (1,234.56)</SelectItem>
					<SelectItem value={LocaleStyle.EU}>EU (1.234,56)</SelectItem>
					<SelectItem value={LocaleStyle.Auto}>Auto (Browser)</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
