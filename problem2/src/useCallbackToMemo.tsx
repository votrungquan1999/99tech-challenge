"use client";
import { useCallback, useEffect, useState } from "react";

// for demonstration purpose only, this does not make the code run more efficiently like useMemo, it just demonstrates that useCallback can be used to memoize a value when the value changes but the dependencies do not change
export function UseUseCallbackToMemo() {
	const [count, setCount] = useState(0);
	const [callBackCount, setCallBackCount] = useState(0);

	const [loading, setLoading] = useState(true);

	const randomValue = Math.random();

	// biome-ignore lint/correctness/useExhaustiveDependencies: this is sematically wrong, but for demonstration purpose
	const memoizedFn = useCallback(() => {
		return randomValue;
	}, [callBackCount]);

	// avoid hydration mismatch while still use Math.random() for demonstration purpose
	useEffect(() => {
		setLoading(false);
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
			<div className="max-w-4xl mx-auto space-y-6">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-foreground mb-2">
						useCallback Demonstration
					</h1>
					<p className="text-muted-foreground">
						Observe how memoized values behave differently from regular values
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-6">
					{/* Regular Counter Section */}
					<div className="bg-card border border-border rounded-lg p-6 shadow-sm">
						<h2 className="text-xl font-semibold mb-4 text-card-foreground">
							Regular Counter
						</h2>
						<div className="space-y-4">
							<div className="flex gap-3">
								<button
									type="button"
									onClick={() => setCount(count + 1)}
									className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
								>
									Increment
								</button>
								<button
									type="button"
									onClick={() => setCount(count - 1)}
									className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors font-medium"
								>
									Decrement
								</button>
							</div>
							<div className="bg-muted rounded-md p-4 text-center">
								<p className="text-sm text-muted-foreground mb-1">Count</p>
								<p className="text-3xl font-bold text-foreground">{count}</p>
							</div>
						</div>
					</div>

					{/* Callback Counter Section */}
					<div className="bg-card border border-border rounded-lg p-6 shadow-sm">
						<h2 className="text-xl font-semibold mb-4 text-card-foreground">
							Callback Counter
						</h2>
						<div className="space-y-4">
							<div className="flex gap-3">
								<button
									type="button"
									onClick={() => setCallBackCount(callBackCount + 1)}
									className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
								>
									Increment
								</button>
								<button
									type="button"
									onClick={() => setCallBackCount(callBackCount - 1)}
									className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors font-medium"
								>
									Decrement
								</button>
							</div>
							<div className="bg-muted rounded-md p-4 text-center">
								<p className="text-sm text-muted-foreground mb-1">
									CallBackCount
								</p>
								<p className="text-3xl font-bold text-foreground">
									{callBackCount}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Value Comparison Section */}
				<div className="bg-card border border-border rounded-lg p-6 shadow-sm">
					<h2 className="text-xl font-semibold mb-4 text-card-foreground">
						Value Comparison
					</h2>
					<div className="grid md:grid-cols-2 gap-4">
						<div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md p-4">
							<p className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-2">
								Random Value (Changes on re-render)
							</p>
							<p className="text-2xl font-mono font-bold text-amber-700 dark:text-amber-300">
								{randomValue.toFixed(6)}
							</p>
						</div>
						<div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-md p-4">
							<p className="text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-2">
								Memoized Value (Stays constant)
							</p>
							<p className="text-2xl font-mono font-bold text-emerald-700 dark:text-emerald-300">
								{memoizedFn().toFixed(6)}
							</p>
						</div>
					</div>
					<div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
						<p className="text-xs text-blue-800 dark:text-blue-200">
							💡 <strong>Tip:</strong> Click the counters above to trigger
							re-renders. Notice how the Random Value changes but the Memoized
							Value stays the same!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
