import { state } from "../global/state.js";
import { colorEvent , colorEventedit } from "./colorEvent.js";
export const renderColor = (targetElementId) => {
  const colorData = state.color;
  const cartColor = document.getElementById(targetElementId);
  cartColor.innerHTML = colorData
    .map((color, index) => {
      return `
        <div class="color-swatch" style="background-color: ${color.color};" ></div>
      `;
    })
    .join(" ");
  colorEvent();
  colorEventedit();
};

