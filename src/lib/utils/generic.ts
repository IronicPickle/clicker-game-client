import { coins, coinsHighToLow, coinsLowToHigh } from "@constants/generic";
import { Coin, CoinData } from "@ts/generic";
import type { Writable } from "svelte/store";

export const styles = (styles: Record<string, any> = {}) =>
  Object.entries(styles)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");

export const classNames = (...classNames: Array<any>) =>
  classNames.filter(className => !!className).join(" ");

export const randomNum = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const minMax = (value: number, min?: number, max?: number) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

export const generateUuid = () => {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
};

export const round = (value: number, decimalPlaces: number = 0) =>
  Math.round((value + Number.EPSILON) * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);

export const pickRandomFromArray = <V>(array: V[]): V => array[randomNum(0, array.length - 1)];

export const pickRandomFromEnum = <V>(_enum: Record<string, V>): V =>
  pickRandomFromArray(Object.values(_enum));

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
