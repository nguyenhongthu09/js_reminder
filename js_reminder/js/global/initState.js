import { fetchList } from "../apiFetch/apiList.js";
import { fetchReminder } from "../apiFetch/apiREminder.js";
import { state } from "./state.js";
import { fetchColor } from "../apiFetch/apiColor.js";
import { renderReminderonUI } from "../UI_controller/reminder_controller.js";
import { updateQueryParam } from "../UI_controller/common.js";
const getPageIdURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const listNoteid = urlParams.get("listId");
  return listNoteid;
};

export const initState = async () => {
  const listsData = await fetchList();
  const reminderData = await fetchReminder();
  const colorData = await fetchColor();
  state.reminderState = reminderData;
  state.listState = listsData;
  state.color = colorData;

  const listIdFromURL = getPageIdURL();
  const storedListId = localStorage.getItem("idUrl");

  if (listIdFromURL) {
    const isValidListId = state.listState.some(
      (list) => list.id === listIdFromURL
    );
    if (isValidListId) {
      state.idUrl = listIdFromURL;
      updateQueryParam(listIdFromURL);
      renderReminderonUI();
    }
  } else if (
    storedListId &&
    state.listState.some((list) => list.id === storedListId)
  ) {
    state.idUrl = storedListId;
    updateQueryParam(storedListId);
  }
};
