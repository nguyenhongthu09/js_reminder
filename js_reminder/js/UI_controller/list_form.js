import { addNewList } from "../apiFetch/apiList.js";
import { renderListOnUI } from "./list_controller.js";
export const formAddList = () =>{
    const homeList = document.querySelector(".menu-list-notes");
    const formAddList = document.getElementById("form_add_list");
    const btnAddList = document.querySelector(".add-list");
    const btnCancelList = document.getElementById("btn-cancel");
    const btnDoneList = document.getElementById("btnSubmit");
    const detailList = document.querySelector(".detail-list-note");
    const backList = document.querySelector(".btn-back-list");
    const listNote = document.querySelector(".menu-list-note");
    btnAddList.addEventListener("click" , ()=>{
        console.log("ok");
        homeList.style.display = "none";
        formAddList.style.display = "block";
    });
    btnCancelList.addEventListener("click" , ()=>{
        homeList.style.display = "block";
        formAddList.style.display = "none";
    });
    btnDoneList.addEventListener("click", async () =>{

        const nameAddList = document.getElementById("name_icon");
        const name = nameAddList.value;
        if (nameAddList !== ""){
            const newList = {
                name: name, 
            };
            await addNewList(newList);
            renderListOnUI();
        }
        if (!nameAddList.value){
            homeList.style.display = "none";
            formAddList.style.display = "block";
        }
        else{
            homeList.style.display = "block";
            formAddList.style.display = "none";
        }
        nameAddList.value = "";
        nameAddList.form.reset();
    });
    listNote.addEventListener("click", ()=>{
        console.log("okok");
        homeList.style.display="none";
        detailList.style.display = "block";
    });
    backList.addEventListener("click", ()=>{
        homeList.style.display="block";
        detailList.style.display = "none";
    });
}