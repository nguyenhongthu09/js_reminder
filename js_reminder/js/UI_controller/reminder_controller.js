import { getReminders } from "../service/reminder_service.js";
import { getListNoteById } from "../service/list_service.js";
import { state } from "../global/state.js";
import { updateReminderStatus } from "../apiFetch/apiREminder.js";
import { removeReminder } from "../service/reminder_service.js";
import { delReminder } from "../apiFetch/apiREminder.js";
import { renderListOnUI } from "./list_controller.js";
export const renderReminderonUI = (listNoteId) =>{
    const listNote = getListNoteById(listNoteId); 
    const listName = listNote ? listNote.name : '';
    const reminderState = state.reminderState;
    const cartReminder = document.querySelector(".note");
    // const falseReminders = [];
   
  // const trueReminders = [];
 
    const filteredReminders = reminderState.filter(reminder => reminder.idlist === listNoteId);
      console.log(filteredReminders, "filteredReminders sau khi xoa");
    // reminderState.forEach((reminder) => {
    //   if (reminder.idlist === listNoteId) {
    //     if (reminder.status) {
    //       trueReminders.push(reminder);
    //     } else {
    //       falseReminders.push(reminder);
    //     }
    //   }
    // });

  //   cartReminder.innerHTML = `
  //   <h1 class="title-list">${listName}</h1>
  //   ${falseReminders.map((reminder, index) => {
    
  //     return renderReminderItem(reminder);
  //   }).join(" ")}
  //   ${trueReminders.map((reminder, index) => {
     
  //     return renderReminderItem(reminder);
  //   }).join(" ")}
  // `;

    cartReminder.innerHTML="";
    cartReminder.innerHTML=`
    <h1 class="title-list">${listName}</h1>
    ${filteredReminders.map((reminder, index) => {
      return `
        <div class="reminder__detail"  id=${reminder.id}   data-listnote-id=${reminder.id}>
          <div class="items-list-reminder">
            <div class="form-check  item-reminder">
              <input class="form-check-input thuthu" type="checkbox" id-input=${reminder.id} ${reminder?.status ? "checked" : ""}>
              <input type="text" class="form-check-name"  data-reminder-id="${reminder.id}" value="${reminder.title}" placeholder="Add Note"></input>
            </div>

          </div>
  <div class="icon-detail-reminder-del">

          <div class="dropdown">
        <button class="btn " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        <span class="icon-next" >
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.64645 1.64645C4.84171 1.45118 5.15829 1.45118 5.35355 1.64645L11.3536 7.64645C11.5488 7.84171 11.5488 8.15829 11.3536 8.35355L5.35355 14.3536C5.15829 14.5488 4.84171 14.5488 4.64645 14.3536C4.45118 14.1583 4.45118 13.8417 4.64645 13.6464L10.2929 8L4.64645 2.35355C4.45118 2.15829 4.45118 1.84171 4.64645 1.64645Z" fill="black"/>
          </svg>           
          </span>
        </button>
        <ul class="dropdown-menu width" aria-labelledby="dropdownMenuButton1" >
        <li><a class="dropdown-item delete" href="#">
        <span class="delete-icon-re" del-id-note =${reminder.id}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 1H9.5C9.77614 1 10 1.22386 10 1.5V2.5H6V1.5C6 1.22386 6.22386 1 6.5 1ZM11 2.5V1.5C11 0.671573 10.3284 0 9.5 0H6.5C5.67157 0 5 0.671573 5 1.5V2.5H2.50566C2.50226 2.49997 2.49885 2.49997 2.49544 2.5H1.5C1.22386 2.5 1 2.72386 1 3C1 3.27614 1.22386 3.5 1.5 3.5H2.0384L2.89116 14.1595C2.97431 15.1989 3.84207 16 4.88479 16H11.1152C12.1579 16 13.0257 15.1989 13.1088 14.1595L13.9616 3.5H14.5C14.7761 3.5 15 3.27614 15 3C15 2.72386 14.7761 2.5 14.5 2.5H13.5046C13.5011 2.49997 13.4977 2.49997 13.4943 2.5H11ZM12.9584 3.5L12.112 14.0797C12.0704 14.5994 11.6366 15 11.1152 15H4.88479C4.36343 15 3.92955 14.5994 3.88798 14.0797L3.0416 3.5H12.9584ZM5.47064 4.50086C5.74631 4.48465 5.98292 4.69497 5.99914 4.97064L6.49914 13.4706C6.51535 13.7463 6.30503 13.9829 6.02936 13.9991C5.7537 14.0154 5.51708 13.805 5.50086 13.5294L5.00086 5.02936C4.98465 4.7537 5.19497 4.51708 5.47064 4.50086ZM10.5294 4.50086C10.805 4.51708 11.0154 4.7537 10.9991 5.02936L10.4991 13.5294C10.4829 13.805 10.2463 14.0154 9.97064 13.9991C9.69497 13.9829 9.48465 13.7463 9.50086 13.4706L10.0009 4.97064C10.0171 4.69497 10.2537 4.48465 10.5294 4.50086ZM8 4.5C8.27614 4.5 8.5 4.72386 8.5 5V13.5C8.5 13.7761 8.27614 14 8 14C7.72386 14 7.5 13.7761 7.5 13.5V5C7.5 4.72386 7.72386 4.5 8 4.5Z" fill="black"/>
        </svg>
        </span></a></li>
        </ul>
        </div>


        </div>
        </div>
      `;
    }).join(" ")}
  `;

  // const reminderInputs = document.querySelectorAll('.thuthu');
  // checks(reminderInputs ,reminderState);
  initializeDeleteButtonsEvents();
};



// const renderReminderItem = (reminder) => {
//   return `
//     <div class="reminder__detail"  id=${reminder.id}>
//       <div class="items-list-reminder">
//         <div class="form-check  item-reminder">
//           <input class="form-check-input thuthu" type="checkbox" id-input=${reminder.id} ${reminder?.status ? "checked" : ""}>
//           <input type="text" class="form-check-name"  data-reminder-id="${reminder.id}" value="${reminder.title}" placeholder="Add Note"></input>
//         </div>
//       </div>
//       <div class="icon-detail-reminder-del">

//       <div class="dropdown">
//   <button class="btn " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
//   <span class="icon-next" >
//   <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path fill-rule="evenodd" clip-rule="evenodd" d="M4.64645 1.64645C4.84171 1.45118 5.15829 1.45118 5.35355 1.64645L11.3536 7.64645C11.5488 7.84171 11.5488 8.15829 11.3536 8.35355L5.35355 14.3536C5.15829 14.5488 4.84171 14.5488 4.64645 14.3536C4.45118 14.1583 4.45118 13.8417 4.64645 13.6464L10.2929 8L4.64645 2.35355C4.45118 2.15829 4.45118 1.84171 4.64645 1.64645Z" fill="black"/>
//       </svg>           
//       </span>
//   </button>
//   <ul class="dropdown-menu width" aria-labelledby="dropdownMenuButton1" >
//     <li><a class="dropdown-item delete" href="#">
//     <span class="delete-icon" del-id-note=${reminder.id}>
//     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M6.5 1H9.5C9.77614 1 10 1.22386 10 1.5V2.5H6V1.5C6 1.22386 6.22386 1 6.5 1ZM11 2.5V1.5C11 0.671573 10.3284 0 9.5 0H6.5C5.67157 0 5 0.671573 5 1.5V2.5H2.50566C2.50226 2.49997 2.49885 2.49997 2.49544 2.5H1.5C1.22386 2.5 1 2.72386 1 3C1 3.27614 1.22386 3.5 1.5 3.5H2.0384L2.89116 14.1595C2.97431 15.1989 3.84207 16 4.88479 16H11.1152C12.1579 16 13.0257 15.1989 13.1088 14.1595L13.9616 3.5H14.5C14.7761 3.5 15 3.27614 15 3C15 2.72386 14.7761 2.5 14.5 2.5H13.5046C13.5011 2.49997 13.4977 2.49997 13.4943 2.5H11ZM12.9584 3.5L12.112 14.0797C12.0704 14.5994 11.6366 15 11.1152 15H4.88479C4.36343 15 3.92955 14.5994 3.88798 14.0797L3.0416 3.5H12.9584ZM5.47064 4.50086C5.74631 4.48465 5.98292 4.69497 5.99914 4.97064L6.49914 13.4706C6.51535 13.7463 6.30503 13.9829 6.02936 13.9991C5.7537 14.0154 5.51708 13.805 5.50086 13.5294L5.00086 5.02936C4.98465 4.7537 5.19497 4.51708 5.47064 4.50086ZM10.5294 4.50086C10.805 4.51708 11.0154 4.7537 10.9991 5.02936L10.4991 13.5294C10.4829 13.805 10.2463 14.0154 9.97064 13.9991C9.69497 13.9829 9.48465 13.7463 9.50086 13.4706L10.0009 4.97064C10.0171 4.69497 10.2537 4.48465 10.5294 4.50086ZM8 4.5C8.27614 4.5 8.5 4.72386 8.5 5V13.5C8.5 13.7761 8.27614 14 8 14C7.72386 14 7.5 13.7761 7.5 13.5V5C7.5 4.72386 7.72386 4.5 8 4.5Z" fill="black"/>
//     </svg>
//     </span></a></li>
//   </ul>
//  </div>


// </div>
//     </div>
//   `;

  
// };



const checks = (reminderInputs , reminderState) =>{
  reminderInputs.forEach(input => {
    input.addEventListener("click", async (event) =>{
      const reminderId = event.currentTarget.getAttribute("id-input");
      const listNoteId = event.currentTarget.closest('.reminder__detail').id;
      const reminderToUpdate = reminderState.find(reminder => reminder.id === reminderId);
  
      reminderToUpdate.status = !reminderToUpdate.status;
        await updateReminderStatus(reminderId, reminderToUpdate.status);
        const updatedReminderState = getReminders();
      renderReminderonUI(updatedReminderState);
     
      
    });
  });
}



export const handleListClick = (listNoteId) => {
  renderReminderonUI(listNoteId);
};


const initializeDeleteButtonsEvents = () => {
  const deleteRenminder = document.querySelectorAll(".delete-icon-re");
  deleteRenminder.forEach((delReminders) => {
    delReminders.addEventListener("click", async (event) => {
      console.log("del");
      const idReminder = event.currentTarget.getAttribute("del-id-note");
      console.log(idReminder, "id xoa");
      if (idReminder) {
        await delReminder(idReminder);
        removeReminder(idReminder);
        renderReminderonUI();
      }
  
    });
  });
};

