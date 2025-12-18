export interface TokenPrice {
  currency: string;
  date: string;
  price: number;
}

export interface Token {
  symbol: string;
  price: number;
  lastUpdated: string;
}

export interface TokenWithIcon extends Token {
  iconUrl: string;
}

export interface SwapResult {
  toAmount: number;
  exchangeRate: number;
  fromToken: string;
  toToken: string;
}

export interface PriceData {
  tokens: Token[];
  fetchedAt: string;
}
