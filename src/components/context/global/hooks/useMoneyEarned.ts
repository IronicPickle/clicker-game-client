import { calcMoneyEarnedPertick } from "@utils/algorithms";
import { round } from "@utils/generic";
import type { Writable } from "svelte/store";

export const moneyEarnedInterval = 250;

export default (
  rpm: Writable<number>,
  money: Writable<number>,
  moneyEarned: Writable<{ amount: number }>,
) => {
  let subscribedRpm = 0;
  rpm.subscribe(newRpm => (subscribedRpm = newRpm));

  let interval;
  clearInterval(interval);
  interval = setInterval(() => {
    const earned = calcMoneyEarnedPertick(subscribedRpm / 2 / 100);
    if (earned === 0) return;
    moneyEarned.set({ amount: earned });
    money.update(money => round(money + earned, 2));
  }, moneyEarnedInterval);
};
