import { getColorState } from "../service/color_service.js";
import { colorEvent } from "./colorEvent.js";

export const renderColor = (targetElementId) => {
  const colorData = getColorState();
  const cartColor = document.getElementById(targetElementId);
  cartColor.innerHTML = colorData
    .map((color) => {
      return `
        <div class="color-swatch" style="background-color: ${color.color};" ></div>
      `;
    })
    .join(" ");
  colorEvent(".fill-icon-color", ".color-list-icon");
  colorEvent(".fill-color-edit", ".render-list-color-edit");
};
