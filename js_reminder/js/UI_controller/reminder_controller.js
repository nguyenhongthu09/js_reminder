import { getReminders } from "../service/reminder_service.js";
import { getListNoteById } from "../service/list_service.js";

export const renderReminderonUI = (listNoteId) =>{
    const listNote = getListNoteById(listNoteId); 
    const listName = listNote ? listNote.name : '';
    const reminderState = getReminders();
    const cartReminder = document.querySelector(".note");
    const filteredReminders = reminderState.filter(reminder => reminder.idlist === listNoteId);
    cartReminder.innerHTML="";
    cartReminder.innerHTML=`
    <h1 class="title-list">${listName}</h1>
    ${filteredReminders.map((reminder, index) => {
      return `
        <div class="reminder__detail"  id=${reminder.id}>
          <div class="items-list-reminder">
            <div class="form-check  item-reminder">
              <input class="form-check-input" type="radio" role="switch" status=${reminder.status}>
              <input type="text" class="form-check-name" value="${reminder.title}" placeholder="Add Note"></input>
            </div>

          </div>
        </div>
      `;
    }).join(" ")}
  `;
};
export const handleListClick = (listNoteId) => {
  // Gọi hàm showListDetail để hiển thị danh sách chi tiết
  renderReminderonUI(listNoteId);
};


    // cartReminder.innerHTML = filteredReminders.map((reminder , index) =>{
    //     const isDescriptionEmpty = !reminder.description || reminder.description.trim() === '';

    //         return `
    //         <div class="reminder__detail id=${reminder.id}" >
    //             <div class="items-list-reminder">
    //             <div class="form-check form-switch item-reminder">
    //                 <input class="form-check-input" type="checkbox" role="switch" status=${reminder.status}>
    //                 <input type="text"  class="form-check-name" value="${reminder.title}" placeholder="Add Note" > 
    //                </input> 
    //             </div>
    //             <p class="text-note ${isDescriptionEmpty ? 'hidden' : ''}">${reminder.description}</p>
    //             </div>
    //         </div>

    //         `;
    // })
    // .join(" ");



