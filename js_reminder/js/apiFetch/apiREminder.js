import  {API_URL} from "../contans/apiUrl.js"
import { getReminders } from "../service/reminder_service.js";
import { updateListQuantity } from "../UI_controller/list_controller.js";
export  const fetchReminder = async () =>{
    try {
        const response = await fetch(`${API_URL}/reminder`, {
          method: "GET",
        });
        if (response.status === 200) {
          const reminderData = await response.json();
          return reminderData;
        }
      } catch (error) {
        console.error("Lỗi khi gửi GET request cho list:", error);
      }
}
export async function addNewReminder(reminder ,idlist) {
  try {
    const newreminder = {
     title:reminder.title,
     status: false,
     idlist: idlist,

    };
    const reminderData = getReminders();
 
    console.log(reminderData, "push thanh cong");
    const response = await fetch(`${API_URL}/reminder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newreminder),
    });

    if (response.status === 201) {
      const createdReminderData = await response.json();
      reminderData.push(createdReminderData);
      updateListQuantity(idlist);
      console.log("Thêm note thành công:", createdReminderData);
    } else {
      console.error("Lỗi khi thêm note:", response.statusText);
    }
  } catch (error) {
    console.error("Lỗi khi gửi POST request:", error);
  }
}


export const updateReminderStatus = (reminderId, newStatus) => {
  const getReminder = getReminders();
  const reminderToUpdate = getReminder.find(reminder => reminder.id === reminderId);

  return fetch(`${API_URL}/reminder/${reminderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({  title: reminderToUpdate.title,
      status: newStatus,
      idlist: reminderToUpdate.idlist, }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })

    .then((updatedReminder) => {
      const index = getReminder.findIndex((r) => r.id === reminderId);
      getReminder[index] = updatedReminder;
    })

    .catch((error) => {
      console.error("Lỗi kết nối đến API: " + error);
    });
};


export async function delReminder(idReminder) {
  await fetch(`${API_URL}/reminder/${idReminder}`, {
    method: "DELETE",
  });
  return idReminder;
}
