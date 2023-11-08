export const hexToRgb = (hex) => {
  // Loại bỏ dấu "#" nếu có
  hex = hex.replace(/^#/, '');

  // Kiểm tra chiều dài của mã màu Hex
  if (hex.length !== 6 && hex.length !== 3) {
    // Nếu mã màu không hợp lệ, trả về một giá trị mặc định hoặc báo lỗi
    return 'rgb(0, 0, 0)'; // Hoặc giá trị mặc định khác tùy bạn
  }

  // Chuyển đổi mã màu Hex thành mã màu RGB
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return `rgb(${r}, ${g}, ${b})`;
}


export function rgbToHex(rgb) {
  // Chuyển đổi dạng RGB thành mảng các giá trị màu
  const values = rgb.match(/\d+/g);

  // Chuyển các giá trị màu thành mã Hex
  const hex = values.map((value) => {
    const hexValue = parseInt(value, 10).toString(16);
    return hexValue.length === 1 ? "0" + hexValue : hexValue;
  });

  // Trả về mã màu Hex hoàn chỉnh
  return "#" + hex.join("");
}
