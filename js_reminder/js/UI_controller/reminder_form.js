import { renderReminderonUI } from "./reminder_controller.js";
import { renderListOnUI } from "./list_controller.js";
import { getListState } from "../service/list_service.js";
import { getCurrentPageFromQueryParams, loading } from "./common.js";
import { addReminderService } from "../service/reminder_service.js";
import { renderHomeList } from "../service/list_service.js";

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

  const disabledAddFormReminder = (status) => {
    if (status) {
      addSubmitFormNote.disabled = false;
      cancel.disabled = false;
    } else {
      addSubmitFormNote.disabled = true;
      cancel.disabled = false;
    }
  };

  addName.addEventListener("input", () => {
    addSubmitFormNote.disabled = addName.value.trim() === "";
  });

  addName.addEventListener("focus", () => {
    disabledAddFormReminder(true);
  });

  addName.addEventListener("blur", () => {
    if (addName.value.trim() !== "") {
      disabledAddFormReminder(true);
    } else {
      disabledAddFormReminder(false);
    }
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

  const disabledAddReminder = (status) => {
    if (status) {
      btnSubmitNote.disabled = false;
      btnbaclList.disabled = true;
    } else {
      btnSubmitNote.disabled = true;
      btnbaclList.disabled = false;
    }
  };

  btnAddNewReminder.addEventListener("click", () => {
    inputNameReminder.value = "";
    toggleDisplayAddReminder(true);
    inputNameReminder.focus();
    isBlurEvent = true;
    disabledAddReminder(true);
  });

  btnbaclList.addEventListener("click", async () => {
    toggleDisplayAddReminder(false);
    thongbao.style.display = "none";
    inputNameReminder.value = "";
    loading([["loader__page"]], { status: true });
    await renderHomeList();
    loading([["loader__page"]], { status: false });
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

  btnSubmitNote.addEventListener("click", async () => {
    isBlurEvent = false;
    await handleAddReminderLogic();
    toggleDisplayAddReminder(false);
    disabledAddReminder(false);
  });
  inputNameReminder.addEventListener("blur", async () => {
    if (isBlurEvent) {
      await handleAddReminderLogic();
    }
    toggleDisplayAddReminder(false);
    disabledAddReminder(false);
  });

  const handleAddReminderLogic = async () => {
    if (isBlurEvent) {
      const inputname = inputNameReminder.value;
      const listNoteId = getCurrentPageFromQueryParams();
      if (inputname && listNoteId) {
        loading([["loader__reminder"]], { status: true });
        await addReminderService(inputname, listNoteId);
        loading([["loader__reminder"]], { status: false });
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
      await addReminderService(inputname, selectedListId);
      renderListOnUI("renderlist-home");
    }

    disabledAddFormReminder(true);
    toggleDisplayFormAddReminder(false);
    thongbao.style.display = "none";
  });
};

document.body.addEventListener("click", (event) => {
  var target = event.target.closest(".list-note");
  const btnAddReminder = document.getElementById("submitform-addnote");
  const btnCancel = document.querySelector(".btn-back-note");
  const addName = document.getElementById("add-note-name");
  const nameListChooseElement = document.querySelector(".name-list-choose");
  if (target) {
    var nameListElement = target.querySelector(".name-list");
    if (nameListElement) {
      var name = nameListElement.textContent;
      var listId = target.dataset.listid;
      if (nameListChooseElement) {
        const isNameListChooseClicked =
          event.target.matches(".name-list-choose");
        if (isNameListChooseClicked) {
          btnAddReminder.disabled = true;
        } else {
          nameListChooseElement.textContent = name;
          nameListChooseElement.dataset.selectedListId = listId;
          btnAddReminder.disabled = addName.value.trim() === "";
        }
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
