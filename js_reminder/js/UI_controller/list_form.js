import { addNewList, updateListData } from "../apiFetch/apiList.js";
import { renderListOnUI } from "./list_controller.js";
import { renderReminderonUI } from "./reminder_controller.js";
import { renderColor } from "./showColor.js";
import { getColorState } from "../service/color_service.js";
import {
  hexToRgb,
  rgbToHex,
  updateQueryParam,
  clearListIdQueryParam,
} from "./common.js";
import { getReminder } from "../apiFetch/apiREminder.js";
import { state } from "../global/state.js";
import { getPageIdURL } from "../global/initState.js";

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
  const nameAddList = document.getElementById("name_icon");
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
    btnDoneList.disabled = true;
    toggleDisplayList(true);
    renderColor("color-list");
  });

  btnxoa.addEventListener("click", () => {
    toggleDisplayEditList(false);
  });

  btnCancelList.addEventListener("click", () => {
    toggleDisplayList(false);
    nameError.style.display = "none";
    nameAddList.value = "";
  });

  const disabledFormAddList = (status) => {
    if (status) {
      btnDoneList.disabled = false;
      btnCancelList.disabled = false;
    } else {
      btnDoneList.disabled = true;
      btnCancelList.disabled = true;
    }
  };

  nameAddList.addEventListener("focus", () => {
    disabledFormAddList(true);
  });

  nameAddList.addEventListener("input", () => {
    btnDoneList.disabled = nameAddList.value.trim() === "";
  });

  btnDoneList.addEventListener("click", async () => {
    disabledFormAddList(false);

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
      disabledFormAddList(true);
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
      state.idUrl = listNoteId; 
      updateQueryParam(listNoteId);
      await getReminder(listNoteId);
      renderReminderonUI(listNoteId);
      toggleDisplayDetailList(true);
    }
  });
};

window.addEventListener("load", () => {
  const listIdFromURL = getPageIdURL();
  if (listIdFromURL) {
    toggleDisplayDetailList(true);
  } else {
    toggleDisplayDetailList(false);
    renderListOnUI("renderlist-home");
  }
});

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

export const toggleDisplayDetailList =  (status) => {
  const homeList = document.querySelector(".menu-list-notes");
  const detailList = document.querySelector(".detail-list-note");
  if (status) {
    homeList.style.display = "none";
    detailList.style.display = "block";
  
  } else {
    homeList.style.display = "block";
    detailList.style.display = "none";
  }
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

