import { renderListOnUI } from "./js/UI_controller/list_controller.js";
import { initState } from "./js/global/initState.js";
import { listActionEvents } from "./js/UI_controller/list_form.js";
import { reminderActionEvents } from "./js/UI_controller/reminder_form.js";
import { loading } from "./js/UI_controller/common.js";
import { fetchReminderDone } from "./js/apiFetch/apiREminder.js";
const main = async () => {
  loading([['loader__page']], true);
  await initState();
  await fetchReminderDone();
  loading([['loader__page']], false);
  renderListOnUI("renderlist-home");
  reminderActionEvents();
  listActionEvents();
  
};
main();
