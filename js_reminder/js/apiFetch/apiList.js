import { API_URL } from "../contans/apiUrl.js";
import { getListState } from "../service/list_service.js";
export  const fetchList = async () =>{
    try {
        const response = await fetch(`${API_URL}/list`, {
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
      id: list.id,
      name: list.name,
    
    };
    const listState = getListState();
    listState.push(newlist);

    const response = await fetch(`${API_URL}/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newlist),
    });

    if (response.status === 201) {
      const createdListData = await response.json();
      console.log("Thêm list thành công:", createdListData);
    } else {
      console.error("Lỗi khi thêm list:", response.statusText);
    }
  } catch (error) {
    console.error("Lỗi khi gửi POST request:", error);
  }
}