import { renderListOnUI } from "./js/UI_controller/list_controller.js";
import { initState } from "./js/global/initState.js";
import { listActionEvents } from "./js/UI_controller/list_form.js";
import { reminderActionEvents } from "./js/UI_controller/reminder_form.js";

const main = async () => {
  await initState();
  renderListOnUI("renderlist-home");
  reminderActionEvents();
  listActionEvents();
};
main();
