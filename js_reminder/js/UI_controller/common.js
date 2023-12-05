import { renderListOnUI } from "./list_controller.js";

export const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, "");
  if (!/^(?:[0-9a-fA-F]{3}){1,2}$/.test(hex)) {
    return "rgb(0, 0, 0)";
  }

  let fullHex =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;

  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);

  return `rgb(${r}, ${g}, ${b})`;
};

export const rgbToHex = (rgb) => {
  const values = rgb.match(/\d+/g);
  const hex = values.map((value) => {
    const hexValue = parseInt(value, 10).toString(16);
    return hexValue.length === 1 ? "0" + hexValue : hexValue;
  });
  return "#" + hex.join("").toUpperCase();
};

export const updateQueryParam = (listId) => {
  const url = new URL(window.location.href);
  url.searchParams.set("listId", listId);
  url.hash = "";
  window.history.replaceState({}, "", url);
};

export const getCurrentPageFromQueryParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const listNoteid = urlParams.get("listId");
  return listNoteid;
};

export const loading = (array, { status }) => {
  const loaderElement = document.querySelector(".loader");
  const overlayElement = document.querySelector(".overlay");
  if (status) {
    loaderElement?.classList.add("spin");
    overlayElement?.classList.remove("loader-hidden");
  } else {
    loaderElement?.classList.remove("spin");
    overlayElement?.classList.add("loader-hidden");
  }

  array.forEach((item) => {
    const [className, animationName] = item;
    const className_element = document.querySelector(`.${className}`);
    if (status) {
      className_element?.classList.add(animationName);
      className_element?.classList.remove("loader-hidden");
    } else {
      className_element?.classList.remove(animationName);
      className_element?.classList.add("loader-hidden");
    }
  });
};

export const clearListIdQueryParam = () => {
  const url = new URL(window.location.href);
  url.searchParams.delete("listId");
  url.hash = "";
  window.history.replaceState({}, "", url);
  renderListOnUI("renderlist-home");
};

export const toggleLoading = ( status) => {
  const loadingOverlay = document.getElementById("loadingOverlay");

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  const startLoading = () => {
    loadingOverlay.classList.add("show");
    loadingOverlay.appendChild(overlay);
  };

  const stopLoading = () => {
    loadingOverlay.classList.remove("show");
    const existingOverlay = loadingOverlay.querySelector(".overlay");
    if (existingOverlay) {
      loadingOverlay.removeChild(existingOverlay);
    }
  };

  if (status) {
    startLoading();
  } else {
    stopLoading();
  }
};
