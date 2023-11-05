import { renderListOnUI } from "./js/UI_controller/list_controller.js";
import { initState } from "./js/global/init.js";
import { formAddList } from "./js/UI_controller/list_form.js";
       function main(){
          initState();
            renderListOnUI();
            formAddList();
       }
       main();