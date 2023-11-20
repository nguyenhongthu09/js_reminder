import { addNewReminder } from "../apiFetch/apiREminder.js";
import { renderReminderonUI } from "./reminder_controller.js";
import { renderListOnUI, updateListTotalCount } from "./list_controller.js";
import { getListState } from "../service/list_service.js";
import { getCurrentPageFromQueryParams } from "./common.js";

export const reminderActionEvents = () => {
  const newReminderForm = document.querySelector(".new-reminder");
  const btnAddNewReminder = document.getElementById("btnNewNote");
  const btnbaclList = document.querySelector(".btn-back-list");
  const inputNameReminder = document.querySelector(".input-new-reminder");
  const btnSubmitNote = document.getElementById("btnsubmit-note");
  const openFormAdd = document.querySelector(".add-reminder");
  const formAddNote = document.querySelector(".form--add__notes");
  const homeList = document.querySelector(".menu-list-notes");
  const cancel = document.querySelector(".btn-back-note");
  const addSubmitFormNote = document.getElementById("submitform-addnote");
  const addName = document.getElementById("add-note-name");
  const thongbao = document.querySelector(".thong-bao");

  let isBlurEvent = false;

  addName.addEventListener("focus", () => {
    addSubmitFormNote.disabled = false;
    cancel.disabled = false;
  });

  addName.addEventListener("blur", () => {
    addSubmitFormNote.disabled = true;
    cancel.disabled = false;
  });

  const toggleDisplayAddReminder = (status) => {
    if (status) {
      newReminderForm.style.display = "block";
    } else {
      newReminderForm.style.display = "none";
    }
  };

  const toggleDisplayFormAddReminder = (status) => {
    if (status) {
      homeList.style.display = "none";
      formAddNote.style.display = "block";
    } else {
      homeList.style.display = "block";
      formAddNote.style.display = "none";
    }
  };

  btnAddNewReminder.addEventListener("click", () => {
    inputNameReminder.value = "";
    toggleDisplayAddReminder(true);
    inputNameReminder.focus();
    isBlurEvent = true;
    btnSubmitNote.disabled = false;
    btnbaclList.disabled = true;
  });

  btnbaclList.addEventListener("click", () => {
    toggleDisplayAddReminder(false);
    thongbao.style.display = "none";
    inputNameReminder.value = "";
  });

  btnSubmitNote.addEventListener("click", async () => {
    isBlurEvent = false;
    await handleAddReminderLogic();
    toggleDisplayAddReminder(false);
    btnSubmitNote.disabled = true;
    btnbaclList.disabled = false;
  });

  openFormAdd.addEventListener("click", () => {
    addName.value = "";
    toggleDisplayFormAddReminder(true);
    renderListOnUI("renderlist");
    getIdListFormAddReminder();
  });

  cancel.addEventListener("click", () => {
    toggleDisplayFormAddReminder(false);
  });

  inputNameReminder.addEventListener("blur", async () => {
    if (isBlurEvent) {
      await handleAddReminderLogic();
    }
    toggleDisplayAddReminder(false);
    btnSubmitNote.disabled = true;
    btnbaclList.disabled = false;
  });

  const handleAddReminderLogic = async () => {
    if (isBlurEvent) {
      const inputname = inputNameReminder.value;
      const listNoteId = getCurrentPageFromQueryParams();
      if (inputname && listNoteId) {
        const newReminder = {
          title: inputname,
          idlist: listNoteId,
        };

        await addNewReminder(newReminder, listNoteId);
        updateListTotalCount(listNoteId);
        renderReminderonUI(listNoteId);
      }
    }
  };

  addSubmitFormNote.addEventListener("click", async () => {
    cancel.disabled = true;
    addSubmitFormNote.disabled = true;
    const inputname = addName.value;
    const selectedListId =
      document.querySelector(".name-list-choose").dataset.selectedListId;
    if (inputname && selectedListId) {
      const newReminder = {
        title: inputname,
        idlist: selectedListId,
      };

      await addNewReminder(newReminder, selectedListId);
      updateListTotalCount(selectedListId);
      renderListOnUI("renderlist-home");
    }

    cancel.disabled = false;
    addSubmitFormNote.disabled = false;
    toggleDisplayFormAddReminder(false);
    thongbao.style.display = "none";
  });
};

document.body.addEventListener("click", (event) => {
  var target = event.target.closest(".list-note");
  const btnAddReminder = document.getElementById("submitform-addnote");
  const btnCancel = document.querySelector(".btn-back-note");
  if (target) {
    var nameListElement = target.querySelector(".name-list");
    if (nameListElement) {
      var name = nameListElement.textContent;
      var listId = target.dataset.listid;
      var nameListChooseElement = document.querySelector(".name-list-choose");
      if (nameListChooseElement) {
        nameListChooseElement.textContent = name;
        nameListChooseElement.dataset.selectedListId = listId;
        btnAddReminder.disabled = false;
        btnCancel.disabled = false;
      }
    }
  }
});

const getIdListFormAddReminder = () => {
  const getList = getListState();
  var defaultName = getList.length > 0 ? getList[0].name : "";
  var defaultListId = getList.length > 0 ? getList[0].id : "";
  var nameListChooseElement = document.querySelector(".name-list-choose");
  if (nameListChooseElement) {
    nameListChooseElement.textContent = defaultName;
    nameListChooseElement.dataset.selectedListId = defaultListId;
  }
};

export const submitUpdateReminder = (handler) => {
  const btnSubmitNote = document.getElementById("btnsubmit-note");
  btnSubmitNote.removeEventListener("click", handler);
  btnSubmitNote.addEventListener("click", handler);
};

