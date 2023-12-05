import { state } from "./state.js";
import { clearListIdQueryParam } from "../UI_controller/common.js";
import { renderUiReminder } from "../UI_controller/list_form.js";
import { getReminder } from "../apiFetch/apiREminder.js";
import { renderHomeList } from "../service/list_service.js";

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
    await renderUiReminder(listIdFromURL);
  } else {
    const storedListId = localStorage.getItem("idUrl");

    if (storedListId) {
      const isValidListId = state.listState.items.some(
        (list) => list.id === storedListId
      );

      if (isValidListId) {
        state.idUrl = storedListId;
        await getReminder(storedListId);
        await renderUiReminder(storedListId);
      } else {
        clearListIdQueryParam();
        await renderHomeList();
      }
    } else {
      clearListIdQueryParam();
      await renderHomeList();
    }
  }
};
