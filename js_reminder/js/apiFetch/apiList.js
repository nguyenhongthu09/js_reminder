import { API_URL } from "../contans/apiUrl.js";
import {
  getListState,
  findListByIndex,
  calculateListNoteQuantity,
} from "../service/list_service.js";
import { state } from "../global/state.js";

export const fetchList = async () => {
  const response = await fetch(`${API_URL}/listNote`, {
    method: "GET",
  });
  if (response.status === 200) {
    const listData = await response.json();

    return listData;
  }
};

export const addNewList = async (list) => {
  const newlist = {
    name: list.name,
    isColor: list.isColor,
    quantity: 0,
  };
  const listStates = getListState();
  listStates.push(newlist);
  console.log(newlist, "list vua duoc them");
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
  }
};

export const delList = async (idList) => {
  await fetch(`${API_URL}/listNote/${idList}`, {
    method: "DELETE",
  });
  return idList;
};

export const updateListNoteQuantity = async (idlist) => {
  const updatedQuantity = calculateListNoteQuantity(idlist);

  const response = await fetch(`${API_URL}/listNote/${idlist}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: updatedQuantity }),
  });

  if (response.ok) {
    const listState = getListState();
    const update = listState.map((list) => {
      if (list.id === idlist) {
        return { ...list, quantity: updatedQuantity };
      }
      return list;
    });
    state.listState = update;
  }
};

export const updateListData = async (id, newName, newColor, quantity) => {
  const response = await fetch(`${API_URL}/listNote/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName, isColor: newColor, quantity }),
  });
  if (response.ok) {
    const listState = getListState();
    const appIndex = findListByIndex(id);
    if (appIndex !== -1) {
      listState[appIndex].name = newName;
      listState[appIndex].isColor = newColor;
      listState[appIndex].quantity = quantity;
    }
  }
};
