import { addNewList } from "../apiFetch/apiList.js";
import { renderListOnUI } from "./list_controller.js";
import { renderReminderonUI } from "./reminder_controller.js";
import { renderColor } from "./showColor.js";
export const formAddList = () => {
  const homeList = document.querySelector(".menu-list-notes");
  const formAddList = document.getElementById("form_add_list");
  const btnAddList = document.querySelector(".add-list");
  const btnCancelList = document.getElementById("btn-cancel");
  const btnDoneList = document.getElementById("btnSubmit");
  const detailList = document.querySelector(".detail-list-note");
  const backList = document.querySelector(".btn-back-list");
  const listNote = document.querySelectorAll(".list-note");
  const nameError = document.getElementById("name_error");
  const menuListNote = document.querySelector(".menu-list-note");

  btnAddList.addEventListener("click", () => {
    console.log("ok");
    homeList.style.display = "none";
    formAddList.style.display = "block";
    renderColor();
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

      const newList = {
        name: name,
        quatity: 0,
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
