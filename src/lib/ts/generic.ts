import type { SvelteComponent } from "svelte";
import type colors from "../constants/colors";

export type Color = keyof typeof colors;

export type ClassName = string;
export type Style = Record<string, string>;

export enum Coin {
  Bronze = "BRONZE",
  Silver = "SILVER",
  Gold = "GOLD",
}

export interface CoinData {
  type: Coin;
  Icon: typeof SvelteComponent;
  color: Color;
  value: number;
}
