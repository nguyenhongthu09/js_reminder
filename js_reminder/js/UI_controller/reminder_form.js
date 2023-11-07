import { addNewReminder } from "../apiFetch/apiREminder.js";
import { renderReminderonUI } from "./reminder_controller.js";
import { getSelectedListNoteId } from "./list_controller.js";
import { updateListNoteQuantity } from "../apiFetch/apiList.js";
import { calculateListNoteQuantity } from "../service/list_service.js";
import { getListState } from "../service/list_service.js";
import { renderListOnUI } from "./list_controller.js";
import { updateListQuantity } from "./list_controller.js";
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
 
  btnAddNewReminder.addEventListener("click", () => {
    inputNameReminder.value = "";
    newReminderForm.style.display = "block";
  });
  btnbaclList.addEventListener("click", () => {
    newReminderForm.style.display = "none";
    inputNameReminder.value = "";
  
  });

  btnSubmitNote.addEventListener("click", async () => {
    const inputname = inputNameReminder.value;
    const listNoteId = getSelectedListNoteId();
    if (inputname && listNoteId) {
      const newReminder = {
        title: inputname,
        idlist: listNoteId,
      };
      await addNewReminder(newReminder, listNoteId);
    const   updatedQuantity = calculateListNoteQuantity(listNoteId);
      await updateListNoteQuantity(listNoteId);
      renderReminderonUI(listNoteId);
      const listData = getListState();
      console.log(listData, "danh sach sau khi them moi note");
      renderListOnUI(listData);
      updateListQuantity(listNoteId , updatedQuantity)
    }
    newReminderForm.style.display = "none";
  });

  openFormAdd.addEventListener("click" , () =>{
      homeList.style.display = "none";
      formAddNote.style.display = "block";
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
  
};
