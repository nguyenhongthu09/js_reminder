import { API_URL } from "../contans/apiUrl.js";
import {
  getListState,
  findListByIndex,
  calculateListNoteQuantity,
  calculateListNoteCheck,
} from "../service/list_service.js";
import { state } from "../global/state.js";
import { generateRandomStringId } from "../service/list_service.js";
import {
  updateListTotalCount,
  updateListCheckbox,
} from "../UI_controller/list_controller.js";
import { fetchReminder, fetchReminderDone } from "./apiREminder.js";
import { getReminderByListId } from "../service/reminder_service.js";



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

export const updateListNoteQuantity = async (idlist) => {
  // const updatedQuantity = calculateListNoteQuantity(idlist);
  // const response = await fetch(`${API_URL}/listNote/${idlist}`, {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ quantity: updatedQuantity }),
  // });
  // if (response.ok) {
  //   const listState = getListState();
  //   const update = listState.map((list) => {
  //     if (list.id === idlist) {
  //       return { ...list, quantity: updatedQuantity };
  //     }
  //     return list;
  //   });
  //   state.listState = update;
  // }
};

export const updateListNoteChecks = async (numcheck) => {
  // const updatedCheckStatus = calculateListNoteCheck(numcheck);
  // const response = await fetch(`${API_URL}/listNote/${numcheck}`, {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ numcheck: updatedCheckStatus }),
  // });
  // if (response.ok) {
  //   const listState = getListState();
  //   const update = listState.map((list) => {
  //     if (list.id === numcheck) {
  //       return { ...list, numcheck: updatedCheckStatus };
  //     }
  //     return list;
  //   });
  //   state.listState = update;
  // }
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

export const fetchList = async () => {
  const response = await fetch(`${API_URL}/listNote?_page=1&_limit=50`, {
    method: "GET",
  });

  if (response.status === 200) {
    const listData = await response.json();
    console.log(listData, "listData");
    const listWithReminders = await Promise.all(
      listData.map(async (listItem) => {
        const { reminderData, totalCount } = await fetchReminder(listItem.id);
        const { reminderDatas, totalDone } = await fetchReminderDone(
          listItem.id
        );
        if (reminderData && totalCount) {
          listItem.reminders = reminderData;
          listItem.totalCount = totalCount;
          if (reminderDatas) {
            listItem.remindersDone = reminderDatas;
          }
          listItem.totalDone = totalDone;
          updateListTotalCount(listItem.id, totalCount);
          updateListCheckbox(listItem.id, totalDone);
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
  }
};