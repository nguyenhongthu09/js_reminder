import { API_URL } from "../contans/apiUrl.js";
import { getListState , getListNoteById} from "../service/list_service.js";
import { calculateListNoteQuantity } from "../service/list_service.js";
import { state } from "../global/state.js";
export  const fetchList = async () =>{
    try {
        const response = await fetch(`${API_URL}/listNote`, {
          method: "GET",
        });
        if (response.status === 200) {
          const listData = await response.json();
    
          return listData;
        }
      } catch (error) {
        console.error("Lỗi khi gửi GET request cho list:", error);
      }
}
export async function addNewList(list) {
  try {
    const newlist = {
      name: list.name,
      quantity: 0
    };
    const listStates = getListState();
    listStates.push(newlist);
    console.log(newlist , "list vua duoc them");
    const response = await fetch(`${API_URL}/listNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newlist),
    });

    if (response.status === 201) {
      const createdListData = await response.json();
      newlist.id = createdListData.id;
      console.log("Thêm list thành công:", createdListData);
     
    } else {
    throw  console.error("Lỗi khi thêm list:", response.statusText);
    }
  } catch (error) {
 throw   console.error("Lỗi khi gửi POST request:", error);
  }
}



export async function updateListNoteQuantity(idlist) {
  try {

    
    const listNoteData = await fetch(`${API_URL}/listNote/${idlist}`);
    const existingListNote = await listNoteData.json();
    const updatedQuantity = calculateListNoteQuantity(idlist);
    const listState = getListState();
    const update = listState.map((list) =>{
      if (list.id === idlist) {
        return { ...list, quantity: updatedQuantity };
      }
      return list;
    });
  state.listState = update;
    const updatedListNote = { ...existingListNote, quantity: updatedQuantity };

    const response = await fetch(`${API_URL}/listNote/${idlist}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedListNote),
    });

    if (response.status === 200) {
   
      console.log("Cập nhật quantity của danh sách thành công.");
    } else {
      console.error("Lỗi khi cập nhật quantity của danh sách:", response.statusText);
    }
  } catch (error) {
    console.error("Lỗi khi gửi PUT request:", error);
  }
}
