import { API_URL } from "../contans/apiUrl.js";
import {
  getReminders,
  findReminderByIndex,
} from "../service/reminder_service.js";
import { state } from "../global/state.js";


export const fetchReminder = async (listId, page , limit ) => {
  const response = await fetch(`${API_URL}/reminder?idlist=${listId}&_page=${page}&_limit=${limit}`, {
    method: "GET",
  });

  if (response.status === 200) {
    const reminderData = await response.json();
    state.reminderState = reminderData;
    const totalCount = response.headers.get('X-Total-Count');

    const completedReminders = reminderData.filter((reminder) => reminder.status === true);

    const totalDone = completedReminders.length;

    console.log(totalCount, "totalCount");
    console.log(totalDone, "totalDone thu");

    return { reminderData, totalCount, totalDone };
  }
};
// export const fetchReminder = async (listId, status = "") => {
//   const response = await fetch(
//     `${API_URL}/reminder?idlist=${listId}&status=${status}&_page=1&_limit=20`,
//     {
//       method: "GET",
//     }
//   );

//   if (response.status === 200) {
//     const reminderData = await response.json();
//     const totalCount = response.headers.get('X-Total-Count');
//     console.log(totalCount, "totalCount");
//     return { reminderData, totalCount };
//   }
// };


// export const fetchReminderTotal = async (listId) => {
//   const { reminderData, total } = await fetchReminder(listId);
//   state.reminderState = reminderData;
//   console.log(total, "total");
//   return { reminderData, total };
// };

// export const fetchReminderDone = async (listId) => {
//   const { reminderDatas, totalDone } = await fetchReminder(listId, true);
//   state.reminderState = reminderDatas;
//   console.log(totalDone, "totalDone");
//   return { reminderDatas, totalDone };
// };



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
    
  }
};




export const updateReminderStatus = async (reminderId, newStatus) => {
  const getReminder = getReminders();
  const reminderToUpdate = getReminder.find(
    (reminder) => reminder.id === reminderId
  );

  const response = await fetch(`${API_URL}/reminder/${reminderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: reminderToUpdate.title,
      status: newStatus,
      idlist: reminderToUpdate.idlist,
    }),
  });
  if (response.ok) {
    const updatedReminder = await response.json();
    const index = getReminder.findIndex((r) => r.id === reminderId);
    getReminder[index] = updatedReminder;
  }
};

export const delReminder = async (idReminder) => {
  await fetch(`${API_URL}/reminder/${idReminder}`, {
    method: "DELETE",
  });
  console.log(state.reminderState, "reminder vua bi xoa");
  return idReminder;
};

export const updateReminderData = async (id, newName) => {
  const response = await fetch(`${API_URL}/reminder/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: newName }),
  });

  if (response.ok) {
    const updatedReminder = await response.json();
    const reminderState = getReminders();
    const appIndex = findReminderByIndex(id);

    if (appIndex !== -1) {
      reminderState[appIndex].title = updatedReminder.title;
    }
  }
};
