import { state } from "../global/state.js"
import { getReminders } from "./reminder_service.js";
export const getListState = () => state.listState;
export const getListNoteById = (listNoteId) => {
    const listNotes = getListState();
    return listNotes.find((listNote) => listNote.id === listNoteId);
  };
  
export function isListIdValid(listid) {
  return state.listState.some(list => list.id === listid);
}

export function findListByIndex(listid) {
  return state.listState.findIndex(list => list.id === listid);
}


export const getColorState = () => state.color;


export function calculateListNoteQuantity(idlist) {
    const reminderState = getReminders();
    const remindersForList = reminderState.filter((reminder) => reminder.idlist === idlist);
    return remindersForList.length;
}

export const removeList = (id) => {
  const listState = getListState();
  const index = listState.findIndex((app) => app.id === id);
  if (index !== -1) {
    listState.splice(index, 1);
  }
};
