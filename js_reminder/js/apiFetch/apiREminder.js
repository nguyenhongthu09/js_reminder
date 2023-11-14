import { API_URL } from "../contans/apiUrl.js";
import {
  getReminders,
  findReminderByIndex,
} from "../service/reminder_service.js";
import { updateListQuantity } from "../UI_controller/list_controller.js";
import { state } from "../global/state.js";

export const fetchReminder = async () => {
  const response = await fetch(`${API_URL}/reminder`, {
    method: "GET",
  });
  if (response.status === 200) {
    const reminderData = await response.json();
    state.reminderState = reminderData;
    return reminderData;
  }
};

export const addNewReminder = async (reminder, idlist) => {
  const newreminder = {
    title: reminder.title,
    status: false,
    idlist: idlist,
  };
  const reminderData = getReminders();
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
  }
};

export const updateReminderStatus = (reminderId, newStatus) => {
  const getReminder = getReminders();
  const reminderToUpdate = getReminder.find(
    (reminder) => reminder.id === reminderId
  );

  return fetch(`${API_URL}/reminder/${reminderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: reminderToUpdate.title,
      status: newStatus,
      idlist: reminderToUpdate.idlist,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })

    .then((updatedReminder) => {
      const index = getReminder.findIndex((r) => r.id === reminderId);
      getReminder[index] = updatedReminder;
    });
};

export const delReminder = async (idReminder) => {
  await fetch(`${API_URL}/reminder/${idReminder}`, {
    method: "DELETE",
  });
  return idReminder;
};

export const updateReminderData = (id, newName) => {
  return fetch(`${API_URL}/reminder/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: newName }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((updatedReminder) => {
      const reminderState = getReminders();
      const appIndex = findReminderByIndex(id);
      if (appIndex !== -1) {
        reminderState[appIndex].title = updatedReminder.title;
      }
    });
};
