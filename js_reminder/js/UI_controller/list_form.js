import { addNewList, updateListData } from "../apiFetch/apiList.js";
import { renderListOnUI } from "./list_controller.js";
import { renderReminderonUI } from "./reminder_controller.js";
import { renderColor } from "./showColor.js";
import { getColorState } from "../service/color_service.js";
import { hexToRgb, rgbToHex, updateQueryParam } from "./common.js";
import { getIdUrlState } from "../service/list_service.js";
import { clearListIdQueryParam } from "./common.js";

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
    btnDoneList.disabled = true;
    btnCancelList.disabled = true;
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
        isColor: isColor,
      };
      await addNewList(newList);
      renderListOnUI("renderlist-home");

      toggleDisplayList(false);
      btnDoneList.disabled = false;
      btnCancelList.disabled = false;
      nameAddList.value = "";
      fillIconColor.style.backgroundColor = "";
      nameAddList.form.reset();
    }
  });

  backList.addEventListener("click", () => {
    clearListIdQueryParam();
    toggleDisplayDetailList(false);
  });

  menuListNote.addEventListener("click", async (event) => {
    const btnDone = document.querySelector("#btnsubmit-note");
    const listItem = event.target.closest(".list-note");
    btnDone.disabled = true;
    if (listItem) {
      const listNoteId = listItem.getAttribute("data-listId");
      let idUrlState = getIdUrlState();
      idUrlState = listNoteId;
      updateQueryParam(listNoteId);
      renderReminderonUI(listNoteId);
      toggleDisplayDetailList(true);
    }
  });
};

export const updateList = () => {
  const btnSubEdit = document.getElementById("btnsubedit");
  btnSubEdit.removeEventListener("click", submitFormEditList);
  btnSubEdit.addEventListener("click", submitFormEditList);
};

const submitFormEditList = async () => {
  const btnSubEdit = document.getElementById("btnsubedit");
  const btnxoa = document.getElementById("btn-xoa");
  btnSubEdit.disabled = true;
  btnxoa.disabled = true;
  const editedName = document.getElementById("name_edit-list").value;
  const editedColorElement = document.getElementById("icon-color-edit");
  const editedColor =
    window.getComputedStyle(editedColorElement).backgroundColor;

  const updatedData = window.newData;

  const editColorHex = editedColor.startsWith("#")
    ? editedColor
    : rgbToHex(editedColor);

  if (updatedData.id) {
    await updateListData(updatedData.id, editedName, editColorHex);
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
    btnSubEdit.disabled = false;
    btnxoa.disabled = false;
    updatedData.id = "";
    updatedData.name = "";
    updatedData.isColor = "";
    toggleDisplayEditList(false);
  }
};

const handleDOMContentLoaded = () => {
  const isListNoteIdValid = (listNoteId) => {
    return true;
  };
  const displayDetailList = localStorage.getItem("displayDetailList");
  toggleDisplayDetailList(displayDetailList === "block");

  const listNoteIdFromUrl = getIdUrlState();
  if (!isListNoteIdValid(listNoteIdFromUrl)) {
    toggleDisplayDetailList(false);
  } else {
    renderReminderonUI(listNoteIdFromUrl);
  }
};
document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
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

export const toggleDisplayDetailList = (status) => {
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
