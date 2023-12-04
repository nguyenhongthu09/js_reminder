import { API_URL } from "../contans/apiUrl.js";
import {
  getListState,
  findListByIndex,
  generateRandomStringId,
} from "../service/list_service.js";
import { fetchReminder , getReminderDone} from "./apiREminder.js";
import { getReminderByListId } from "../service/reminder_service.js";
import { state } from "../global/state.js";

export const fetchList = async () => {
  try {
  
    const response = await fetch(`${API_URL}/listNote`, {
      method: "GET",
    });


    if (response.status === 200) {
      const listData = await response.json();
      const listWithTotals = await Promise.all(
        listData.map(async (listItem) => {
          const { reminderData, totalCount, totalDone ,reminderDataDone } = await fetchTotals(listItem.id);
          listItem.reminders = reminderData || [];
          listItem.totalCount = totalCount || 0;
          listItem.totalDone = totalDone || 0;
          listItem.remindersDone = reminderDataDone || [];
          return listItem;
        })
      );
      state.listState.items = listWithTotals;
      state.reminderState = listWithTotals.reduce(
        (acc, listItem) => [...acc, ...listItem.reminders],
        []
      );
      return listData;
    }
  } catch (error) {
    console.error("Error fetching list:", error);
  }
};
export const fetchTotals = async (listId) => {
  const {reminderData, totalCount } = await fetchReminder(listId);
  const { reminderDataDone ,totalDone } = await getReminderDone(listId);
  return {reminderData, totalCount, totalDone ,reminderDataDone};
};

export const addNewList = async (list) => {
  const newlist = {
    name: list.name,
    isColor: list.isColor,
    id: generateRandomStringId(),
  };
  const response = await fetch(`${API_URL}/listNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newlist),
  });

  if (response.status === 201) {
    const createdListNote = await response.json();
    createdListNote.totalCount = 0;
    createdListNote.totalDone = 0;
    createdListNote.reminders = [];
    createdListNote.remindersDone = [];

    state.listState.items.push(createdListNote);
  }
};

export const delList = async (idList) => {
  const reminderToDele = getReminderByListId(idList);

  await fetch(`${API_URL}/listNote/${idList}`, {
    method: "DELETE",
  });

  state.reminderState = state.reminderState.filter(
    (reminder) => !reminderToDele.find((r) => r.id === reminder.id)
  );
  state.listState.items = state.listState.items.filter(
    (listItem) => listItem.id !== idList
  );

  return idList;
};

export const updateListData = async (id, newName, newColor) => {
  const response = await fetch(`${API_URL}/listNote/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newName,
      isColor: newColor,
    }),
  });
  if (response.ok) {
    const listState = getListState();
    const appIndex = findListByIndex(id);
    if (appIndex !== -1) {
      listState[appIndex].name = newName;
      listState[appIndex].isColor = newColor;
    }
  }
};
