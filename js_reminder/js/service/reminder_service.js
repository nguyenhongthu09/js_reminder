import { state } from "../global/state.js";

export const getReminders = () => state.reminderState;

export const removeReminder = (id) => {
  const index = state.reminderState.findIndex((list) => list.id === id);
  if (index !== -1) {
    state.reminderState.splice(index, 1);
  }
};

export const findReminderByIndex = (reminderId) => {
  return state.reminderState.findIndex(
    (reminder) => reminder.id === reminderId
  );
}

export const findReminderById = (reminderId) => {
  return state.reminderState.find((reminder) => reminder.id === reminderId);
}

export const findReminderByFilter = (reminderId) => {
  return state.reminderState.filter(
    (reminder) => reminder.idlist === reminderId
  );
}

export const filterRemindersByStatus = (reminderId, status) => {
  const filteredReminders = findReminderByFilter(reminderId);
  return filteredReminders.filter((reminder) => reminder.status === status);
}
