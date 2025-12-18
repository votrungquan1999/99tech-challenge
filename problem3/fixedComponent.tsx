import { useMemo } from "react";

// mock classes for the sake of the example
const classes = {
	row: "some class name to style the row",
};

const getPriority = (blockchain: string): number => {
	switch (blockchain) {
		case "Osmosis":
			return 100;
		case "Ethereum":
			return 50;
		case "Arbitrum":
			return 30;
		case "Zilliqa":
			return 20;
		case "Neo":
			return 20;
		default:
			return -99;
	}
};

// mock useWalletBalances for the sake of the example
function useWalletBalances(): WalletBalance[] {
	return [];
}

// mock usePrices for the sake of the example
function usePrices(): Record<string, number> {
	return {};
}

// mock WalletRowProps for the sake of the example
function WalletRow({
	className,
	amount,
	usdValue,
	formattedAmount,
}: {
	className: string;
	amount: number;
	usdValue: number;
	formattedAmount: string;
}) {
	return (
		<div className={className}>
			<div>{amount}</div>
			<div>{usdValue}</div>
			<div>{formattedAmount}</div>
		</div>
	);
}

// mock BoxProps for the sake of the example
interface BoxProps {
	// some props here
	[key: string]: unknown;
}

// mock empty WalletPageProps for the sake of the example
interface WalletPageProps extends BoxProps {}

interface WalletBalance {
	currency: string;
	amount: number;
	blockchain: string;
}

function WalletPage(props: WalletPageProps) {
	const balances = useWalletBalances();
	const prices = usePrices();

	// use useMemo to memoize the displayRows to prevent unnecessary re-computation
	// when component re-renders due to parent re-render
	const sortedBalances = useMemo(() => {
		return (
			balances
				// compute fields for each wallets
				.map((wallet) => {
					const priority = getPriority(wallet.blockchain);

					return {
						...wallet,
						priority,
					};
				})
				// filter out wallet can't not identify priority or negative amount
				.filter((wallet) => {
					return wallet.priority !== -99 && wallet.amount >= 0;
				})
				// can use toSorted here, but some browser might not support it
				.sort((left, right) => {
					// sort by descanding of priority
					return right.priority - left.priority;
				})
		);
	}, [balances]);

	return (
		<div {...props}>
			{sortedBalances.map((wallet) => {
				const price = prices[wallet.currency];

				const usdValue = price * wallet.amount;
				const formattedAmount = wallet.amount.toFixed(8);

				return (
					<WalletRow
						key={`${wallet.blockchain}-${wallet.currency}`}
						className={classes.row}
						amount={wallet.amount}
						usdValue={usdValue}
						formattedAmount={formattedAmount}
					/>
				);
			})}
		</div>
	);
}

export default WalletPage;
