import { Card, CardContent, CardHeader } from "src/components/ui/card";
import { Skeleton } from "src/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<div className="space-y-3">
						<Skeleton className="h-6 w-32" />
						<div className="flex items-center justify-between">
							<Skeleton className="h-8 w-[140px]" />
							<div className="space-y-1">
								<Skeleton className="h-3 w-20 ml-auto" />
								<Skeleton className="h-3 w-24 ml-auto" />
							</div>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						{/* Token selectors */}
						<div className="flex items-center gap-2">
							<Skeleton className="flex-1 h-10" />
							<Skeleton className="h-10 w-10 rounded-full shrink-0" />
							<Skeleton className="flex-1 h-10" />
						</div>

						{/* Exchange rate */}
						<Skeleton className="h-6 w-3/4 mx-auto" />

						<div className="border-t border-border" />

						{/* Input */}
						<div className="space-y-2">
							<Skeleton className="h-4 w-16" />
							<Skeleton className="h-16" />
						</div>

						<div className="border-t border-border" />

						{/* Output */}
						<div className="space-y-2">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-20" />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
