import { addNewList } from "../apiFetch/apiList.js";
import { renderListOnUI } from "./list_controller.js";
import { renderReminderonUI } from "./reminder_controller.js";
import { renderColor } from "./showColor.js";
import { getColorState } from "../service/list_service.js";
import { hexToRgb } from "./common.js";
export const formAddList = () => {
  const homeList = document.querySelector(".menu-list-notes");
  const formAddList = document.getElementById("form_add_list");
  const formEditList = document.getElementById("form_edit_list");
  const btnAddList = document.querySelector(".add-list");
  const btnCancelList = document.getElementById("btn-cancel");
  const btnxoa = document.getElementById("btn-xoa");
  const btnDoneList = document.getElementById("btnSubmit");
  const detailList = document.querySelector(".detail-list-note");
  const backList = document.querySelector(".btn-back-list");
  const nameError = document.getElementById("name_error");
  const menuListNote = document.querySelector(".menu-list-note");
  const fillIconColor = document.querySelector(".fill-icon-color");
  const colorData = getColorState();

  btnAddList.addEventListener("click", () => {
    homeList.style.display = "none";
    formAddList.style.display = "block";
    renderColor("color-list");

  });

  btnxoa.addEventListener("click" , () =>{
    formEditList.style.display = "none";
    homeList.style.display = "block";
  });

  btnCancelList.addEventListener("click", () => {
    homeList.style.display = "block";
    formAddList.style.display = "none";
    nameError.style.display = "none";
  });
  btnDoneList.addEventListener("click", async () => {
    const nameAddList = document.getElementById("name_icon");
    const name = nameAddList.value;

    if (name === "") {
      nameError.style.display = "block";
    } else {
      nameError.style.display = "none";
      const backgroundColor = getComputedStyle(fillIconColor).backgroundColor; 
      console.log(backgroundColor, "backgroundColor"); 

      const listColor = colorData.find((color) => hexToRgb(color.color) === backgroundColor);
      console.log(listColor, "listColor");
      const isColor = listColor ? listColor.color : null;

      const newList = {
        name: name,
        quantity: 0,
        isColor: isColor,
      };
     await addNewList(newList);
      renderListOnUI();

      homeList.style.display = "block";
      formAddList.style.display = "none";

      nameAddList.value = "";
      nameAddList.form.reset();
    }
  });

  backList.addEventListener("click", () => {
    const newURL = window.location.protocol + '//' + window.location.host + window.location.pathname;
  window.history.replaceState({ path: newURL }, '', newURL);
    homeList.style.display = "block";
    detailList.style.display = "none";
  });

  menuListNote.addEventListener("click", (event) => {
    const listItem = event.target.closest(".list-note");
    if (listItem) {
        const listNoteId = listItem.getAttribute("data-listId");
        renderReminderonUI(listNoteId);
        homeList.style.display = "none";
       detailList.style.display = "block";
    }
});




};
