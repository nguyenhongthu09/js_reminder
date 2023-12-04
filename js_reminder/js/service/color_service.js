import { state } from "../global/state.js";

export const findColor = (colorData, colorId) => {
  return colorData.find((color) => color.color === colorId);
}

export const getColorState = () => state.color;

export function setColorState(newColor) {
  state.color = newColor;
}