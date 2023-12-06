import { renderListOnUI } from "./js/UI_controller/list_controller.js";
import { initState } from "./js/global/initState.js";
import { listActionEvents } from "./js/UI_controller/list_form.js";
import { reminderActionEvents } from "./js/UI_controller/reminder_form.js";
import { loading } from "./js/UI_controller/common.js";

const main = async () => {
  loading([["loader__page"]], { status: true });
  await initState();
  loading([["loader__page"]], { status: false });
  renderListOnUI("renderlist-home");
  reminderActionEvents();
  listActionEvents();
};
main();
