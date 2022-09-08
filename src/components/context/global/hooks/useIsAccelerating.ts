import { writable, Writable } from "svelte/store";

export default (rpm: Writable<number>) => {
  const isAccelerating = writable(false);

  let oldRpm = 0;
  rpm.subscribe(newRpm => {
    isAccelerating.set(newRpm > oldRpm);
    oldRpm = newRpm;
  });

  return { isAccelerating };
};
