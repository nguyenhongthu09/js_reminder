import { addNewList, updateListData } from "../apiFetch/apiList.js";
import { renderListOnUI } from "./list_controller.js";
import { renderReminderonUI } from "./reminder_controller.js";
import { renderColor } from "./showColor.js";
import { getColorState } from "../service/color_service.js";
import { hexToRgb, rgbToHex } from "./common.js";
import { updateQueryParam } from "./common.js";
import { getIdUrlState } from "../service/list_service.js";
export const listActionEvents = () => {
  const homeList = document.querySelector(".menu-list-notes");
  const formAddList = document.getElementById("form_add_list");
  const btnAddList = document.querySelector(".add-list");
  const btnCancelList = document.getElementById("btn-cancel");
  const btnxoa = document.getElementById("btn-xoa");
  const btnDoneList = document.getElementById("btnSubmit");
  const backList = document.querySelector(".btn-back-list");
  const nameError = document.getElementById("name_error");
  const menuListNote = document.querySelector(".menu-list-note");
  const fillIconColor = document.querySelector(".fill-icon-color");
  const colorData = getColorState();

  const toggleDisplayList = (status) => {
    if (status) {
      homeList.style.display = "none";
      formAddList.style.display = "block";
    } else {
      homeList.style.display = "block";
      formAddList.style.display = "none";
    }
  };

 

  btnAddList.addEventListener("click", () => {
    toggleDisplayList(true);
    renderColor("color-list");
  });

  btnxoa.addEventListener("click", () => {
    toggleDisplayEditList(false);
  });

  btnCancelList.addEventListener("click", () => {
    toggleDisplayList(false);
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

      const listColor = colorData.find(
        (color) => hexToRgb(color.color) === backgroundColor
      );
      const isColor = listColor ? listColor.color : null;

      const newList = {
        name: name,
        quantity: 0,
        isColor: isColor,
      };
      await addNewList(newList);
      renderListOnUI("renderlist-home");

      toggleDisplayList(false);

      nameAddList.value = "";
      nameAddList.form.reset();
    }
  });

  backList.addEventListener("click", () => {
    const newURL =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.replaceState({ path: newURL }, "", newURL);
    toggleDisplayDetailList(false);
  });

  menuListNote.addEventListener("click", (event) => {
    const listItem = event.target.closest(".list-note");
    if (listItem) {
      const listNoteId = listItem.getAttribute("data-listId");
      let idUrlState = getIdUrlState();
      idUrlState = listNoteId;
      updateQueryParam(listNoteId);
      renderReminderonUI(listNoteId);
      toggleDisplayDetailList(true);
      sessionStorage.setItem("lastVisitedListId", listNoteId);
    }
  });
};

export const updateList = () => {
  const btnSubEdit = document.getElementById("btnsubedit");
  btnSubEdit.addEventListener("click", async () => {
    const editedName = document.getElementById("name_edit-list").value;
    const editedColorElement = document.getElementById("icon-color-edit");
    const editedColor =
      window.getComputedStyle(editedColorElement).backgroundColor;

    const updatedData = window.newData;

    const editColorHex = editedColor.startsWith("#")
      ? editedColor
      : rgbToHex(editedColor);

    if (updatedData.id) {
      await updateListData(
        updatedData.id,
        editedName,
        editColorHex,
        updatedData.quantity
      );
      const listElement = updatedData.element;
      const updatedListData = {
        name: editedName,
        color: editedColor,
      };
      Object.keys(updatedListData).forEach((property) => {
        const selector = `.icon-list-note [data-${property}]`;
        const elementToUpdate = listElement.querySelector(selector);
        if (elementToUpdate) {
          if (property === "color") {
            elementToUpdate.style.backgroundColor = updatedListData[property];
          } else if (property === "name") {
            elementToUpdate.textContent = updatedListData[property];
          }
        }
      });

      renderListOnUI("renderlist-home");

      updatedData.id = "";
      updatedData.name = "";
      updatedData.isColor = "";
      updatedData.quantity = null;
      toggleDisplayEditList(false);
    }
  });
};

export const toggleDisplayEditList = (status) => {
  const formEditList = document.getElementById("form_edit_list");
  const homeList = document.querySelector(".menu-list-notes");

  if (status) {
    formEditList.style.display = "block";
    homeList.style.display = "none";
  } else {
    formEditList.style.display = "none";
    homeList.style.display = "block";
  }
};

const toggleDisplayDetailList = (status) => {
  const homeList = document.querySelector(".menu-list-notes");
  const detailList = document.querySelector(".detail-list-note");
  if (status) {
    homeList.style.display = "none";
    detailList.style.display = "block";
    localStorage.setItem("displayDetailList", "block"); 
  } else {
    homeList.style.display = "block";
    detailList.style.display = "none";
    localStorage.setItem("displayDetailList", "none"); 
  }
};
window.addEventListener('load', () => {
  const savedDisplayState = localStorage.getItem("displayDetailList");
  const homeList = document.querySelector(".menu-list-notes");
  const detailList = document.querySelector(".detail-list-note");

  if (savedDisplayState === "block") {
    homeList.style.display = "none";
    detailList.style.display = "block";
    
  } else {
    homeList.style.display = "block";
    detailList.style.display = "none";
    
  }
});