export const colorEvent = (fillIconSelector, colorListSelector) => {
  const btnSubEdit = document.getElementById("btnsubedit");
  const colorListIcon = document.querySelector(colorListSelector);

  colorListIcon.addEventListener("click", (event) => {
    btnSubEdit.disabled = false;
    if (event.target.classList.contains("color-swatch")) {
      const backgroundColor = getComputedStyle(event.target).backgroundColor;

      const fillIconColor = document.querySelector(fillIconSelector);
      fillIconColor.style.backgroundColor = backgroundColor;

      const allColorSwatches = document.querySelectorAll(".color-swatch");
      allColorSwatches.forEach((swatch) => {
        swatch.classList.remove("selected");
      });

      event.target.classList.add("selected");
    }
  });
};
