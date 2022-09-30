import { randomNum, round } from "@shared/utils/generic";

export const diminishNumber = (x: number, scaleFactor: number, startValue: number) =>
  Math.pow(scaleFactor, x) * startValue;

export const calcMoneyEarnedPertick = (rpm: number) => {
  let moneyEarned = rpm;

  const randomNumber = randomNum(0, 100);

  if (randomNumber > 90) {
    moneyEarned *= 5;
  } else if (randomNumber > 50) {
    moneyEarned *= 2;
  }

  return round(moneyEarned, 2);
};
