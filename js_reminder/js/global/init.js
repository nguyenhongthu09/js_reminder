import { fetchList } from "../apiFetch/apiList.js";
import { state } from "./state.js";
import { renderListOnUI } from "../UI_controller/list_controller.js";
export const initState = async () => {
  const listsData = await fetchList();
  state.listState = listsData;
  renderListOnUI();
  console.log(state.listState, "list");
  
};
