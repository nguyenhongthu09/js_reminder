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
      id: reminder.id,
     title:reminder.title,
     description:reminder.description,
     status: false,
     idlist: idlist,

    };
    const reminderData = getReminders();
    reminderData.push(newreminder);
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
      updateListQuantity(idlist);
      console.log("Thêm note thành công:", createdReminderData);
    } else {
      console.error("Lỗi khi thêm note:", response.statusText);
    }
  } catch (error) {
    console.error("Lỗi khi gửi POST request:", error);
  }
}