import { fetchList } from "../apiFetch/apiList.js";
import { state } from "./state.js";
import { fetchColor } from "../apiFetch/apiColor.js";
import { renderReminderonUI } from "../UI_controller/reminder_controller.js";
import {
  updateQueryParam,
  clearListIdQueryParam,
} from "../UI_controller/common.js";
import { renderListOnUI } from "../UI_controller/list_controller.js";
import { toggleDisplayDetailList } from "../UI_controller/list_form.js";
const getPageIdURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const listNoteid = urlParams.get("listId");
  return listNoteid;
};

export const initState = async () => {
  const listsData = await fetchList();
  const colorData = await fetchColor();
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
      renderReminderonUI(listIdFromURL);
    } else {
      clearListIdQueryParam();
      toggleDisplayDetailList(false);
      renderListOnUI("renderlist-home");
    }
  } else if (
    storedListId &&
    state.listState.some((list) => list.id === storedListId)
  ) {
    state.idUrl = storedListId;
    updateQueryParam(storedListId);
    renderReminderonUI(storedListId);
  }
};
