import type colors from "../constants/colors";

export type Color = keyof typeof colors;

export type ClassName = string;
export type Style = Record<string, string>;
