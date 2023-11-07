import { fetchList } from "../apiFetch/apiList.js";
import { fetchReminder } from "../apiFetch/apiREminder.js";
import { state } from "./state.js";
import { renderListOnUI } from "../UI_controller/list_controller.js";
import { fetchColor } from "../apiFetch/apiColor.js";
export const initState = async () => {
  const listsData = await fetchList();
  const reminderData = await fetchReminder();
  const colorData = await fetchColor();
  state.reminderState = reminderData;
  state.listState = listsData;
  state.color = colorData;
  renderListOnUI();
  console.log(state.reminderState, "notestate");
  console.log(state.listState , "liststate");
  console.log(state.color , "color");
};
