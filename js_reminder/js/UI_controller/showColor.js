import { state } from "../global/state.js";
export const renderColor = () =>{
            const colorData = state.color;
            const cartColor = document.querySelector(".color-list-icon");
            cartColor.innerHTML = colorData.map((color, index) =>{
                    return `
                    <div class="color-swatch" style="background-color: ${color.color};" id=${color.id}></div>
                    `
            })
            .join(" ");
};

// Lấy tất cả các phần tử "color-swatch"
const colorSwatches = document.querySelectorAll('.color-swatch');


colorSwatches.forEach((swatch) => {
  swatch.addEventListener('click', (event) => {
    console.log("color");
    console.log(event.target); // In ra phần tử mà người dùng đã nhấp vào
    console.log(event.target.style.backgroundColor); 
    // Lấy màu nền hiện tại từ "color-swatch" đó
    const backgroundColor = swatch.style.backgroundColor;

    // Lấy phần tử "fill-icon-color"
    const fillIconColor = document.querySelector('.fill-icon-color');

    // Đặt màu nền cho class "fill-icon-color"
    fillIconColor.style.backgroundColor = backgroundColor;
  });
});

