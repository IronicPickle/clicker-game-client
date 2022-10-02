import StorageItem, { ItemResponse } from "@lib/utils/StorageItem";
import { onDestroy, onMount } from "svelte";
import { writable } from "svelte/store";

const useStorageItem = <D>(key: string, initial?: D) => {
  const storageItem = new StorageItem<D>(key);

  const prevItem = storageItem.get();

  const initialValue = prevItem.data != null ? prevItem.data : initial ?? null;

  const item = writable<ItemResponse<D>>({ ...prevItem, data: initialValue });

  const set = (data: D | null) => {
    item.set(storageItem.set(data));
    window.dispatchEvent(new Event("storage"));
  };
  const remove = () => {
    item.set(storageItem.remove());
  };

  const handleStorageChange = () => {
    item.set(storageItem.get());
  };

  onMount(() => {
    window.addEventListener("storage", handleStorageChange);
  });

  onDestroy(() => {
    window.removeEventListener("storage", handleStorageChange);
  });

  return { item, set, remove };
};

export default useStorageItem;
