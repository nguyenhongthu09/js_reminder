import { state } from "../global/state.js";
import { delList } from "../apiFetch/apiList.js";
import { addNewList } from "../apiFetch/apiList.js";
import { hexToRgb } from "../UI_controller/common.js";
import { getColorState } from "./color_service.js";
import { renderListOnUI } from "../UI_controller/list_controller.js";
import { fetchList } from "../apiFetch/apiList.js";
import { fetchColor } from "../apiFetch/apiColor.js";
export const getListState = () => state.listState.items;

export const removeList = async (id) => {
  await delList(id);
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
  return state.listState.items.some((list) => list.id === listid);
};

export const findListByIndex = (listid) => {
  return state.listState.items.findIndex((list) => list.id === listid);
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

export const getListTotals = (listId) => {
  const selectedList = state.listState.items.find(
    (listItem) => listItem.id === listId
  );

  if (selectedList) {
    const { totalCount, totalDone } = selectedList;
    return { totalCount, totalDone };
  } else {
    return { totalCount: 0, totalDone: 0 };
  }
};

export const renderHomeList = async () => {
  const listsData = await fetchList();
  const colorData = await fetchColor();
  state.listState.items = listsData;
  state.color = colorData;
  renderListOnUI("renderlist-home");
};

export function setListState(newItems) {
  state.listState.items = newItems;
}

export const addNewListToService = async (name, backgroundColor) => {
  const colorData = getColorState();
  const listColor = colorData.find(
    (color) => hexToRgb(color.color) === backgroundColor
  );
  const isColor = listColor ? listColor.color : null;

  const newList = {
    name: name,
    isColor: isColor,
  };

  await addNewList(newList);
};
