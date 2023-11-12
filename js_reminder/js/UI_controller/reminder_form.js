import { addNewReminder , updateReminderData } from "../apiFetch/apiREminder.js";
import { renderReminderonUI } from "./reminder_controller.js";
import { getSelectedListNoteId } from "./list_controller.js";
import { updateListNoteQuantity } from "../apiFetch/apiList.js";
import { calculateListNoteQuantity } from "../service/list_service.js";
import { getListState } from "../service/list_service.js";
import { renderListOnUI } from "./list_controller.js";
import { updateListQuantity } from "./list_controller.js";
import { findReminderById } from "../service/reminder_service.js";
import { state } from "../global/state.js";
export const addNewReminderForm = () => {
  const newReminderForm = document.querySelector(".new-reminder");
  const btnAddNewReminder = document.getElementById("btnNewNote");
  const btnbaclList = document.querySelector(".btn-back-list");
  const inputNameReminder = document.querySelector(".input-new-reminder");
  const btnSubmitNote = document.getElementById("btnsubmit-note");
  const openFormAdd = document.querySelector(".add-reminder");
  const formAddNote = document.querySelector(".form--add__notes");
  const homeList = document.querySelector(".menu-list-notes");
  const cancel = document.querySelector(".btn-back-note");
  const reminderDetails = document.querySelectorAll(".reminder__detail");
const formEdit = document.getElementById("form__edit__note");
  const listnote = document.querySelectorAll(".detail-list-note");
  const addSubmitFormNote = document.getElementById("submitform-addnote")
  const addName = document.getElementById("add-note-name");
  
  let isBlurEvent = false;
  btnAddNewReminder.addEventListener("click", () => {
    inputNameReminder.value = "";
    newReminderForm.style.display = "block";
    inputNameReminder.focus();
    isBlurEvent = true;
  });
  btnbaclList.addEventListener("click", () => {
    newReminderForm.style.display = "none";
    inputNameReminder.value = "";
  
  });

  btnSubmitNote.addEventListener("click", async () => {
    isBlurEvent = false;
    await handleReminderLogic();
    newReminderForm.style.display = "none";
  });
// mo form them moi 1 reminder
  openFormAdd.addEventListener("click" , () =>{
    addName.value="";
      homeList.style.display = "none";
      formAddNote.style.display = "block";
     
      renderListOnUI("renderlist");

  });
  cancel.addEventListener("click" , ()=>{
    console.log("okok");
    homeList.style.display = "block";
    formAddNote.style.display = "none";
  });

  reminderDetails.forEach((reminderDetail) => {
    reminderDetail.addEventListener("click", () => {
     console.log("ok");
      listnote.style.display = "none";
      formEdit.style.display = "block";
    });
  });
  
  inputNameReminder.addEventListener("blur", async () => {
    if (isBlurEvent) {
      await handleReminderLogic();
  }
  newReminderForm.style.display = "none";
});

const handleReminderLogic = async () => {
  if (isBlurEvent) {
    const inputname = inputNameReminder.value;
    const listNoteId = getSelectedListNoteId();
    if (inputname && listNoteId) {
        const newReminder = {
            title: inputname,
            idlist: listNoteId,
        };
        await addNewReminder(newReminder, listNoteId);
        const updatedQuantity = calculateListNoteQuantity(listNoteId);
        await updateListNoteQuantity(listNoteId);
        renderReminderonUI(listNoteId);
        renderListOnUI("renderlist-home");
        updateListQuantity(listNoteId, updatedQuantity);
    }

}
};

addSubmitFormNote.addEventListener("click", async() =>{
  const inputname = addName.value;
  console.log(inputname, "inputname");
  const selectedListId = document.querySelector(".name-list-choose").dataset.selectedListId;
  // const listNoteId = getSelectedListNoteId();
  console.log(selectedListId, "selectedListId");
  if (inputname && selectedListId) {
      const newReminder = {
          title: inputname,
          idlist: selectedListId,
      };
      await addNewReminder(newReminder, selectedListId);
      const updatedQuantity = calculateListNoteQuantity(selectedListId);
      await updateListNoteQuantity(selectedListId);
      renderReminderonUI(selectedListId);
      renderListOnUI("renderlist-home");
      updateListQuantity(selectedListId, updatedQuantity);
    }
    homeList.style.display = "block";
    formAddNote.style.display = "none";
});


var defaultName = state.listState.length > 0 ? state.listState[0].name : "";
var defaultListId = state.listState.length > 0 ? state.listState[0].id : "";
var nameListChooseElement = document.querySelector(".name-list-choose");
if (nameListChooseElement) {
    nameListChooseElement.textContent = defaultName;
    nameListChooseElement.dataset.selectedListId = defaultListId;
}

};


document.body.addEventListener("click", function (event) {
  var target = event.target.closest(".list-note");
    if (target) {
        var nameListElement = target.querySelector(".name-list");
        if (nameListElement) {
            var name = nameListElement.textContent;
            var listId = target.dataset.listid; 
            var nameListChooseElement = document.querySelector(".name-list-choose");
            if (nameListChooseElement) {
                nameListChooseElement.textContent = name;
                nameListChooseElement.dataset.selectedListId = listId; 
            }

        }
    }
});





export const submitUpdateReminder = (handler) =>{
  
  const btnSubmitNote = document.getElementById("btnsubmit-note");
  btnSubmitNote.removeEventListener("click", handler);
  btnSubmitNote.addEventListener("click", handler);
}
 export const resetUpdatedData = () => {
  window.newData = {
    id: "",
    title: "",
    status: null,
    idlist: null,
    element: null,
  };
};
