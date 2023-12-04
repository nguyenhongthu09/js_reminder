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
import { getReminder } from "../apiFetch/apiREminder.js";
export const getPageIdURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const listNoteid = urlParams.get("listId");
  return listNoteid;
};

export const initState = async () => {
  const listIdFromURL = getPageIdURL();

  if (listIdFromURL) {
    state.idUrl = listIdFromURL;
    await getReminder(listIdFromURL);
    await   renderReminderonUI(listIdFromURL);
    toggleDisplayDetailList(true);
  } else {
    const storedListId = localStorage.getItem("idUrl");

    if (storedListId) {
      const isValidListId = state.listState.items.some(
        (list) => list.id === storedListId
      );

      if (isValidListId) {
        state.idUrl = storedListId;
        await getReminder(storedListId);
        renderReminderonUI(storedListId);
        toggleDisplayDetailList(true);
      } else {
        clearListIdQueryParam();
        const listsData = await fetchList();
        const colorData = await fetchColor();
        state.listState.items = listsData;
        state.color = colorData;
        renderListOnUI("renderlist-home");
      }
    } else {
      clearListIdQueryParam();
      const listsData = await fetchList();
      const colorData = await fetchColor();
      state.listState.items = listsData;
      state.color = colorData;
      renderListOnUI("renderlist-home");
    }
  }
  const storedListName = localStorage.getItem("listName");
  if (storedListName) {
    const titleElement = document.querySelector(".title-list");
    if (titleElement) {
      titleElement.textContent = storedListName;
    }
  }
};



