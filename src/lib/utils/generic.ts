import type { Writable } from "svelte/store";

export const styles = (styles: Record<string, any> = {}) =>
  Object.entries(styles)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");

export const classNames = (...classNames: Array<any>) =>
  classNames.filter(className => !!className).join(" ");

export const randomNum = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const diminishNumber = (x: number, scaleFactor: number, startValue: number) =>
  Math.pow(scaleFactor, x) * startValue;

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
  Math.round(value * (decimalPlaces * 10)) / (decimalPlaces * 10);

export const pickRandomFromArray = <V>(array: V[]): V => array[randomNum(0, array.length - 1)];

export const pickRandomFromEnum = <V>(_enum: Record<string, V>): V =>
  pickRandomFromArray(Object.values(_enum));
