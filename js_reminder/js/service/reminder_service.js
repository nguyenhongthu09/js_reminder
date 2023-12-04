import { state } from "../global/state.js";
import { delReminder } from "../apiFetch/apiREminder.js";
import { addNewReminder } from "../apiFetch/apiREminder.js";
export const getReminders = () => state.reminderState;

export const removeReminder = async (id) => {
  await delReminder(id);
  const index = state.reminderState.findIndex((list) => list.id === id);
  if (index !== -1) {
    state.reminderState.splice(index, 1);
  }
};

export const findReminderByIndex = (reminderId) => {
  return state.reminderState.findIndex(
    (reminder) => reminder.id === reminderId
  );
};

export const findReminderById = (reminderId) => {
  return state.reminderState.find((reminder) => reminder.id === reminderId);
};

export const findReminderByFilter = (reminderId) => {
  return state.reminderState.filter(
    (reminder) => reminder.idlist === reminderId
  );
};

export const filterRemindersByStatus = (reminderId, status) => {
  const filteredReminders = findReminderByFilter(reminderId);
  return filteredReminders.filter((reminder) => reminder.status === status);
};

export const getReminderByListId = (idlist) => {
  const reminderState = getReminders();
  return reminderState.filter((reminder) => reminder.idlist === idlist);
};

export const addReminderService = async (inputname, listNoteId) => {
  const newReminder = {
    title: inputname,
    idlist: listNoteId,
  };

  await addNewReminder(newReminder, listNoteId);
};
