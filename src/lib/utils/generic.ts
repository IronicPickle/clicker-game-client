import { isDev } from "@config/config";
import { coins, coinsHighToLow } from "@constants/generic";
import { Coin, CoinData } from "@ts/generic";

export const styles = (styles: Record<string, any> = {}) =>
  Object.entries(styles)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");

export const classNames = (...classNames: Array<any>) =>
  classNames.filter(className => !!className).join(" ");

export const moneyToCoins = (money: number): Record<Coin, number> => {
  const gold = Math.floor(money / coins.GOLD.value);
  money = money % coins.GOLD.value;
  const silver = Math.floor(money / coins.SILVER.value);
  money = money % coins.SILVER.value;
  const bronze = Math.floor(money / coins.BRONZE.value);
  money = money % coins.BRONZE.value;

  return {
    [Coin.Bronze]: bronze,
    [Coin.Silver]: silver,
    [Coin.Gold]: gold,
  };
};

export const moneyToMaxCoin = (money: number): CoinData | null => {
  for (const coin of coinsHighToLow) {
    const coinData = coins[coin];
    if (money >= coinData.value) return coinData;
  }
  return null;
};

export const log = (...text: any[]) => {
  if (isDev) console.log("[Development]", ...text);
};
