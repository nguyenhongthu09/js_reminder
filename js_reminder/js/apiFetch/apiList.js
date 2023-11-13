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
  const listNoteData = await fetch(`${API_URL}/listNote/${idlist}`);
  const existingListNote = await listNoteData.json();
  const updatedQuantity = calculateListNoteQuantity(idlist);
  const listState = getListState();
  const update = listState.map((list) => {
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
};

export const updateListData = (id, newName, newColor, quantity) => {
  return fetch(`${API_URL}/listNote/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName, isColor: newColor, quantity }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Cập nhật list không thành công.");
        throw new Error("Cập nhật không thành công");
      }
    })
    .then(() => {
      const listState = getListState();
      const appIndex = findListByIndex(id);
      if (appIndex !== -1) {
        listState[appIndex].name = newName;
        listState[appIndex].isColor = newColor;
        listState[appIndex].quantity = quantity;
      }
    });
};
