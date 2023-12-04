import { API_URL } from "../contans/apiUrl.js";
import {
  getReminders,
  findReminderByIndex,
} from "../service/reminder_service.js";
import { state } from "../global/state.js";

export const fetchReminder = async (listId ) => {
  const url = new URL(`${API_URL}/reminder?idlist=${listId}`);
  let page = parseInt(url.searchParams.get("_page"));
  if (!Number.isInteger(page) || page <= 0) {
    page = 1;
  }
  const limit = 1;

  url.searchParams.append("_page", page);
  url.searchParams.append("_limit", limit);
  const response = await fetch(url, {
    method: "GET",
  });

  if (response.status === 200) {
    const reminderData = await response.json();
    const totalCount = response.headers.get("X-Total-Count");
    return {  reminderData, totalCount };
  }
};

export const getReminderDone = async (listId) => {
  const url = new URL(`${API_URL}/reminder?idlist=${listId}&status=true`);
  let page = parseInt(url.searchParams.get("_page"));
  if (!Number.isInteger(page) || page <= 0) {
    page = 1;
  }
  const limit = 1;

  url.searchParams.append("_page", page);
  url.searchParams.append("_limit", limit);
  const response = await fetch(url, {
    method: "GET",
  });

  if (response.status === 200) {
    const reminderDataDone = await response.json();
    const totalDone = response.headers.get("X-Total-Count");
    return { reminderDataDone, totalDone };
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
      const currentTotalCount = parseInt(state.listState.items[listIndex].totalCount, 10) || 0;
      state.listState.items[listIndex].totalCount = currentTotalCount + 1;
      // state.listState.items[listIndex].totalDone = totalDone;
    }
    console.log(state.listState.items, "reminder api them");
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
    state.reminderState = state.reminderState.map((reminder) => {
      if (reminder.id === reminderId) {
        return { ...reminder, status: newStatus };
      }
      return reminder;
    });
    const updatedReminderIdList = reminderToUpdate.idlist;
    state.listState.items = state.listState.items.map((listItem) => {
      if (listItem.id === updatedReminderIdList) {
        const remindersForList = state.reminderState.filter(
          (reminder) => reminder.idlist === updatedReminderIdList
        );
        const totalDone = remindersForList.filter(
          (reminder) => reminder.status === true
        ).length;

        return {
          ...listItem,
          totalDone: totalDone,
        };
      }
      return listItem;
    });
  }
};

export const delReminder = async (id) => {
  const response = await fetch(`${API_URL}/reminder/${id}`, {
    method: "DELETE",
  });
  if (response.status === 200) {
    const deletedReminder = state.reminderState.find(
      (reminder) => reminder.id === id
    );
    state.reminderState = state.reminderState.filter(
      (reminder) => reminder.id !== id
    );

    if (deletedReminder) {
      const listId = deletedReminder.idlist;

      state.listState.items.forEach((listItem) => {
        if (listItem.reminders.some((reminder) => reminder.id === id)) {
          listItem.reminders = listItem.reminders.filter(
            (reminder) => reminder.id !== id
          );
          listItem.totalCount = listItem.reminders.length;
          listItem.totalDone = listItem.reminders.filter(
            (reminder) => reminder.status === true
          ).length;
        }
      });
      const listToUpdate = state.listState.items.find(
        (listItem) => listItem.id === listId
      );

      if (listToUpdate) {
        listToUpdate.reminders = state.reminderState.filter(
          (reminder) => reminder.idlist === listId
        );

        listToUpdate.totalCount = listToUpdate.reminders.length;
        listToUpdate.totalDone = listToUpdate.reminders.filter(
          (reminder) => reminder.status === true
        ).length;
      }
    }

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
  