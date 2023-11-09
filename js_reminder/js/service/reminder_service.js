import {state} from "../global/state.js"
export const getReminders = () => state.reminderState;

export const removeReminder = (id) => {
   
  const index = state.reminderState.findIndex((list) => list.id === id);
  if (index !== -1) {
    state.reminderState.splice(index, 1);
  }
};
