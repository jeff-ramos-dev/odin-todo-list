import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import differenceInCalendarWeeks from 'date-fns/differenceInCalendarWeeks'
import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths'
import isAfter from 'date-fns/isAfter'

export default function Lister() {

  const todoLists = {
    "My List": [
      {
        "title": "My Title",
        "description": "My Description",
        "dueDate": new Date(),
        "priority": 1,
        "complete": false,
        "parentList": "My List"
      },
    ]
  }

  function compare(date1, date2) {
    return isAfter(date1.dueDate, date2.dueDate) ? 1 : -1
  }

  const getAllLists = () => {
    const listOfLists = todoLists
    for (const list in listOfLists) {
      listOfLists[list].sort(compare)
    }
    return listOfLists
  }


  const getTodayList = () => {
    let todayList = []
    const today = new Date()
    for (const list in todoLists) {
      let numOfItems = todoLists[list].length
      for (let i = 0; i < numOfItems; i++) {
        const currItem = todoLists[list][i]
        if (differenceInCalendarDays(currItem.dueDate, today) === 0) {
          todayList.push(currItem)
        }
      }
    }
    todayList.sort()
    return todayList
  }

  const getWeekList = () => {
    let weekList = []
    const today = new Date()
    for (const list in todoLists) {
      let numOfItems = todoLists[list].length
      for (let i = 0; i < numOfItems; i++) {
        const currItem = todoLists[list][i]
        if (differenceInCalendarWeeks(currItem.dueDate, today) === 0) {
          weekList.push(currItem);
        }
      }
    }
    weekList.sort(compare)
    return weekList
  }

  const getMonthList = () => {
    let monthList = []
    const today = new Date()
    for (const list in todoLists) {
      let numOfItems = todoLists[list].length
      for (let i = 0; i < numOfItems; i++) {
        const currItem = todoLists[list][i]
        if (differenceInCalendarMonths(currItem.dueDate, today) === 0) {
          monthList.push(currItem)
        }
      }
    }
    function compare(date1, date2) {
      return isAfter(date1.dueDate, date2.dueDate) ? 1 : -1
    }
    monthList.sort(compare)
    return monthList
  }

  const createNewList = (title = 'My List') => {
    const count = Object.keys(todoLists).length

    if (title === 'My List' && count > 0) {
      title += ` ${count + 1}`
    }

    const list = [
      {
        "title": "My Title",
        "description": "My Description",
        "dueDate": new Date(),
        "priority": 1,
        "complete": false,
        "parentList": title
      }
    ]

    todoLists[title] = list

    return "List created successfully"
  }

  const addItem = (listName) => {

    const item = {
      "title": "My Title",
      "description": "My Description",
      "dueDate": new Date(),
      "priority": 1,
      "complete": false,
      "parentList": listName
    }

    todoLists[listName].push(item)

    return "Item added successfully"
  }

  const updateTitle = (item, newTitle) => {
    item.title = newTitle

    return 'Title updated successfully'
  }

  const updateDescription = (item, newDesc) => {
    item.description = newDesc

    return 'Description updated successfully'
  }

  const updateDueDate = (item, newDate) => {
    item.dueDate = newDate

    return 'Date updated successfully'
  }

  const updatePriority = (item, newPriority) => {
    item.priority = newPriority

    return 'Priority updated successfully'
  }

  const updateComplete = (item, newComplete) => {
    item.complete = newComplete

    return 'Complete updated successfully'
  }


  const updateItem = (
    listName,
    index,
    title = todoLists[listName][index].title,
    description = todoLists[listName][index].description,
    dueDate = todoLists[listName][index].dueDate,
    priority = todoLists[listName][index].priority,
    complete = todoLists[listName][index].complete
  ) => {
    todoLists[listName][index] = {
      "title": title,
      "description": description,
      "dueDate": dueDate,
      "priority": priority,
      "complete": complete,
      "parentList": listName
    }

    return 'Item updated successfully'
  }

  const deleteItem = (listName, index) => {

    todoLists[listName].splice(index, 1)

    return 'Item deleted successfully'
  }

  const deleteList = (listName) => {
    delete todoLists[listName]

    return 'List deleted successfully'
  }

  return {
    getAllLists,
    getTodayList,
    getMonthList,
    getWeekList,
    createNewList,
    addItem,
    updateItem,
    updateTitle,
    updateDescription,
    updateDueDate,
    updatePriority,
    updateComplete,
    deleteItem,
    deleteList,
  }
}