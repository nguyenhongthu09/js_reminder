export const colorEvent = () =>{
    const colorListIcon = document.querySelector(".color-list-icon");

    colorListIcon.addEventListener("click",  (event) =>{
        console.log("mau a ahahaha");
        if (event.target.classList.contains("color-swatch")) {
            const backgroundColor = getComputedStyle(event.target).backgroundColor;
    
            const fillIconColor = document.querySelector(".fill-icon-color");
            fillIconColor.style.backgroundColor = backgroundColor;
    
            const allColorSwatches = document.querySelectorAll(".color-swatch");
            allColorSwatches.forEach((swatch) => {
                swatch.classList.remove("selected");
            });
    
            event.target.classList.add("selected");
        }
    });
};

export const colorEventedit = () =>{
    const colorListIcon = document.querySelector(".thu");

    colorListIcon.addEventListener("click",  (event) =>{
        if (event.target.classList.contains("color-swatch")) {
            const backgroundColor = getComputedStyle(event.target).backgroundColor;
    
            const fillIconColor = document.querySelector(".thuthu");
            fillIconColor.style.backgroundColor = backgroundColor;
    
            const allColorSwatches = document.querySelectorAll(".color-swatch");
            allColorSwatches.forEach((swatch) => {
                swatch.classList.remove("selected");
            });
    
            event.target.classList.add("selected");
        }
    });
};

