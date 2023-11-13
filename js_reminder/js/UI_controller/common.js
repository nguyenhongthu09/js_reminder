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
