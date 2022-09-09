import { generateUuid } from "@utils/generic";
import { writable } from "svelte/store";

export default <T>(removalTimeout: number, reuseIndexes?: boolean) => {
  type V = T & { key: string; available: boolean };

  const queue = writable<Array<V>>([]);

  const addToQueue = (item: T) => {
    let key = generateUuid();

    const newItem: V = { ...item, key, available: false };

    queue.update(currQueue => {
      const availabeIndex = currQueue.findIndex(currCoinSet => currCoinSet.available);

      if (availabeIndex >= 0) {
        key = currQueue[availabeIndex].key;
        currQueue[availabeIndex] = { ...newItem, key };
      } else currQueue = [...currQueue, newItem];

      return currQueue;
    });

    if (removalTimeout) {
      setTimeout(() => {
        queue.update(currCoinSets => {
          if (reuseIndexes) {
            return currCoinSets.map(currCoinSet =>
              currCoinSet.key === key
                ? {
                    ...currCoinSet,
                    available: true,
                  }
                : currCoinSet,
            );
          }
          return currCoinSets.slice(1);
        });
      }, removalTimeout);
    }
  };

  return { queue, addToQueue };
};
