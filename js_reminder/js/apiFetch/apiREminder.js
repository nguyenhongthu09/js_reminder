import { API_URL } from "../contans/apiUrl.js";
import {
  getReminders,
  findReminderByIndex,
} from "../service/reminder_service.js";
import { state } from "../global/state.js";

export const fetchReminder = async (listId, page) => {
  if (!Number.isInteger(page) || page < 1) {
    page = 1;
  }
  const url = new URL(`${API_URL}/reminder?idlist=${listId}`);
  url.searchParams.append("_page", page);

  const response = await fetch(url, {
    method: "GET",
  });

  if (response.status === 200) {
    const reminderData = await response.json();
    const totalCount = response.headers.get("X-Total-Count");

    const completedReminders = reminderData.filter(
      (reminder) => reminder.status === true
    );

    const totalDone = completedReminders.length;
    return { reminderData, totalCount, totalDone };
  }
};

export const getReminder = async (listId) => {
  const response = await fetch(`${API_URL}/reminder?idlist=${listId}`, {
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

    const listIndex = state.listState.items.findIndex(
      (item) => item.id === idlist
    );

    if (listIndex !== -1) {
      state.listState.items[listIndex].reminders.push(createdReminderData);
      const totalReminders = state.listState.items[listIndex].reminders.length;
      const totalDone = state.listState.items[listIndex].reminders.filter(
        (reminder) => reminder.status === true
      ).length;

      state.listState.items[listIndex].totalCount = totalReminders;
      state.listState.items[listIndex].totalDone = totalDone;
    }
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
    state.listState.items.forEach((listItem) => {
      const foundReminder = listItem.reminders.find(
        (reminder) => reminder.id === reminderId
      );

      if (foundReminder) {
        foundReminder.status = newStatus;

        if (newStatus) {
          listItem.remindersDone.push(foundReminder);
        } else {
          listItem.remindersDone = listItem.remindersDone.filter(
            (reminder) => reminder.id !== reminderId
          );
        }
        const totalReminders = listItem.reminders.length;
        const totalDone = listItem.reminders.filter(
          (reminder) => reminder.status === true
        ).length;

        listItem.totalCount = totalReminders;
        listItem.totalDone = totalDone;
      }
    });
  }
};

export const delReminder = async (id) => {
  const response = await fetch(`${API_URL}/reminder/${id}`, {
    method: "DELETE",
  });

  if (response.status === 200) {
    state.reminderState = state.reminderState.filter(
      (reminder) => reminder.id !== id
    );

    state.listState.items.forEach((listItem) => {
      listItem.reminders = listItem.reminders.filter(
        (reminder) => reminder.id !== id
      );
      const totalReminders = listItem.reminders.length;
      const totalDone = listItem.reminders.filter(
        (reminder) => reminder.status === true
      ).length;

      listItem.totalCount = totalReminders;
      listItem.totalDone = totalDone;
    });
  }
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
