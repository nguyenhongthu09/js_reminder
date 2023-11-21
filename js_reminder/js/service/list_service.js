import { state } from "../global/state.js";

export const getListState = () => state.listState;

export const removeList = (id) => {
  const listState = getListState();
  const index = listState.findIndex((list) => list.id === id);
  if (index !== -1) {
    listState.splice(index, 1);
  }
};
export const getListNoteById = (listNoteId) => {
  const listNotes = getListState();
  return listNotes.find((listNote) => listNote.id === listNoteId);
};

export const isListIdValid = (listid) => {
  return state.listState.some((list) => list.id === listid);
};

export const findListByIndex = (listid) => {
  return state.listState.findIndex((list) => list.id === listid);
};

export const getIdUrlState = () => state.idUrl;

export const generateRandomStringId = (length = 8) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
