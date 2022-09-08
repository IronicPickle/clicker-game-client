import type { Writable } from "svelte/store";

export default (rpm: Writable<number>, reductionRate: number, reductionDelay: number) => {
  let interval;
  rpm.subscribe(value => {
    clearInterval(interval);
    interval = setInterval(() => {
      rpm.update(rpm => {
        let newRpm = rpm - reductionRate;
        if (newRpm < 0) newRpm = 0;
        return newRpm;
      });
    }, reductionDelay);
  });
};
