import { renderListOnUI } from "./js/UI_controller/list_controller.js";
import { initState } from "./js/global/init.js";
import { formAddList } from "./js/UI_controller/list_form.js";
import { addNewReminderForm } from "./js/UI_controller/reminder_form.js";

const main = async () => {
  await initState();
  renderListOnUI("renderlist-home");
  addNewReminderForm();
  formAddList();
};
main();
