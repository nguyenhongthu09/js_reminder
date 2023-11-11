import {state} from "../global/state.js"
export const getReminders = () => state.reminderState;

export const removeReminder = (id) => {
   
  const index = state.reminderState.findIndex((list) => list.id === id);
  if (index !== -1) {
    state.reminderState.splice(index, 1);
  }
};


export function findReminderByIndex(reminderId) {
  return state.reminderState.findIndex(reminder => reminder.id === reminderId);
}

export function findReminderById(reminderId) {
  return state.reminderState.find(reminder => reminder.id === reminderId);
}
