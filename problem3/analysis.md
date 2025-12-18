Requirements:
List out the computational inefficiencies and anti-patterns found in the code block below.

## Assumptions:

#### Developer mistakes

- Some type are wrong.
- Some use the wrong variables

1. missing `blockchain` field in the `WalletBalance` to get `balancePriority`
2. `lhsPriority` not defiend in the filter

   -> Assuming interviewer don't want me to focus on these kind of problems since they are not related to inefficiencies and anti-patterns. and they can just be simple dev mistake and the way of fixing them depends heavily on context

#### wrong filtering

- the account is filter to only show wallets with negative amount
  -> assumming need to change the filter to show positive amount

#### wrong sorting

- the account is sorted from low priority first. and what lhs and rhs, why have that naming convention
  -> assuming need to change to high priority first

#### unique identifier of each wallet

- don't know the data yet
  -> assumming the blockchain-currency would be unique and can be used for key

#### Possible not found price

- price can be undefined for some currency of a wallet
  -> assuming all the possible prices will be defined since this need special hanlde depending on context

## computational inefficiencies

1. `getPriority` is functional, can move outside of components to prevent new function created on each rerender
2. `getPriority` is called multiple times in the filter and sort for the same items -> should call getPriority once only in map before chaining with filter and sort
3. `prices` is declared in the dependencies of useMemo even though it was not used
4. `formattedBalances` is computed but was not used

### anti-patterns

1. use index as key for list items
2. use type `any` in typescript
3. Component `WalletPage` receive `children` in props, but not used
4. format account balance with no decimal place
5. Naming of the `Props` is confusing
6. Some fields of `BoxProps` might be incompatible with `div` props

## fixed Component

```tsx
import { useMemo } from 'react'

// mock classes for the sake of the example
const classes = {
  row: 'some class name to style the row',
}

const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100
    case 'Ethereum':
      return 50
    case 'Arbitrum':
      return 30
    case 'Zilliqa':
      return 20
    case 'Neo':
      return 20
    default:
      return -99
  }
}

// mock useWalletBalances for the sake of the example
function useWalletBalances(): WalletBalance[] {
  return []
}

// mock usePrices for the sake of the example
function usePrices(): Record<string, number> {
  return {}
}

// mock WalletRowProps for the sake of the example
function WalletRow({
  className,
  amount,
  usdValue,
  formattedAmount,
}: {
  className: string
  amount: number
  usdValue: number
  formattedAmount: string
}) {
  return (
    <div className={className}>
      <div>{amount}</div>
      <div>{usdValue}</div>
      <div>{formattedAmount}</div>
    </div>
  )
}

// mock BoxProps for the sake of the example
interface BoxProps {
  // some props here
  [key: string]: unknown
}

// mock empty WalletPageProps for the sake of the example
interface WalletPageProps extends BoxProps {}

interface WalletBalance {
  currency: string
  amount: number
  blockchain: string
}

function WalletPage(props: WalletPageProps) {
  const balances = useWalletBalances()
  const prices = usePrices()

  // use useMemo to memoize the displayRows to prevent unnecessary re-computation
  // when component re-renders due to parent re-render
  const sortedBalances = useMemo(() => {
    return (
      balances
        // compute fields for each wallets
        .map((wallet) => {
          const priority = getPriority(wallet.blockchain)

          return {
            ...wallet,
            priority,
          }
        })
        // filter out wallet can't not identify priority or negative amount
        .filter((wallet) => {
          return wallet.priority !== -99 && wallet.amount >= 0
        })
        // can use toSorted here, but some browser might not support it
        .sort((left, right) => {
          // sort by descanding of priority
          return right.priority - left.priority
        })
    )
  }, [balances])

  return (
    <div {...props}>
      {sortedBalances.map((wallet) => {
        const price = prices[wallet.currency]

        const usdValue = price * wallet.amount
        const formattedAmount = wallet.amount.toFixed(8)

        return (
          <WalletRow
            key={`${wallet.blockchain}-${wallet.currency}`}
            className={classes.row}
            amount={wallet.amount}
            usdValue={usdValue}
            formattedAmount={formattedAmount}
          />
        )
      })}
    </div>
  )
}

export default WalletPage
```
