import { Coin, CoinData } from "@ts/generic";
import CoinIcon from "@components/common/media/icons/CoinIcon.svelte";
import colors from "./colors";

export const coins: Record<Coin, CoinData> = {
  [Coin.Bronze]: {
    type: Coin.Bronze,
    Icon: CoinIcon,
    color: "philippineBronze",
    value: 0.01,
  },
  [Coin.Silver]: {
    type: Coin.Silver,
    Icon: CoinIcon,
    color: "lightSilver",
    value: 0.1,
  },
  [Coin.Gold]: {
    type: Coin.Gold,
    Icon: CoinIcon,
    color: "lightGold",
    value: 1,
  },
};

export const coinsLowToHigh = [Coin.Bronze, Coin.Silver, Coin.Gold];
export const coinsHighToLow = [...coinsLowToHigh].reverse();
