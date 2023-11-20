import { API_URL } from "../contans/apiUrl.js";
import { getListState, findListByIndex } from "../service/list_service.js";

import { generateRandomStringId } from "../service/list_service.js";

import { fetchReminder } from "./apiREminder.js";
import { getReminderByListId } from "../service/reminder_service.js";


export const fetchList = async () => {
  const response = await fetch(`${API_URL}/listNote`, {
    method: "GET",
  });

  if (response.status === 200) {
    const listData = await response.json();
    console.log(listData, "listData");

    const listWithReminders = await Promise.all(
      listData.map(async (listItem) => {
        const { reminderData, totalCount, totalDone } = await fetchReminder(listItem.id);

        if (reminderData !== undefined && totalCount !== undefined && totalDone !== undefined) {
          listItem.reminders = reminderData;
          listItem.totalCount = totalCount;
          listItem.remindersDone = reminderData;  
          listItem.totalDone = totalDone;
        } else {
          listItem.reminders = [];
          listItem.remindersDone = [];
          listItem.totalCount = 0;
          listItem.totalDone = 0;
        }

        return listItem;
      })
    );

    return listWithReminders;
  } else {
    return []; 
  }
};


export const addNewList = async (list) => {
  const newlist = {
    name: list.name,
    isColor: list.isColor,
    id: generateRandomStringId(),
  };
  const listStates = getListState();
  const response = await fetch(`${API_URL}/listNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newlist),
  });

  if (response.status === 201) {
    const createdListData = await response.json();
    newlist.id = createdListData.id.toString();
    listStates.push(newlist);
  }
};

export const delList = async (idList) => {
  const reminderToDele = getReminderByListId(idList);

  await fetch(`${API_URL}/listNote/${idList}`, {
    method: "DELETE",
  });

  for (const reminder of reminderToDele) {
    await fetch(`${API_URL}/reminder/${reminder.id}`, {
      method: "DELETE",
    });
  }

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


export const getListTotals = async (listId) => {
  const listWithReminders = await fetchList();

  const selectedList = listWithReminders.find(
    (listItem) => listItem.id === listId
  );

  if (selectedList) {
    const { totalCount, totalDone } = selectedList;
    return { totalCount, totalDone };
  } else {
    return { totalCount: 0, totalDone: 0 };
  }
};
