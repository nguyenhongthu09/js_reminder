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



export function calculateListNoteQuantity(idlist) {
    const reminderState = getReminders();
    const remindersForList = reminderState.filter((reminder) => reminder.idlist === idlist);
    return remindersForList.length;
}