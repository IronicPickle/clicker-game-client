import type { Writable } from "svelte/store";

export default (rpm: Writable<number>) => {
  let subscribedRpm = 0;
  rpm.subscribe(newRpm => (subscribedRpm = newRpm));

  let interval;
  clearInterval(interval);
  interval = setInterval(() => {
    console.log(subscribedRpm);
  }, 500);
};
