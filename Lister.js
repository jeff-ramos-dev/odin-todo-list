export default function Lister() {

  const todoLists = {
    "My List": [
      {
        "title": "My Title",
        "description": "My Description",
        "dueDate": Date().split(' ').splice(0, 4).join(' '),
        "priority": 1,
        "complete": false
      },
    ]
  }

  const getAllLists = () => todoLists

  const getTodayList = () => {
    let todayList = []
    const today = Date().split(' ').splice(0, 4).join(' ')
    for (const list in todoLists) {
      let numOfItems = todoLists[list].length
      for (let i = 0; i < numOfItems; i++) {
        const currItem = todoLists[list][i]
        if (currItem.dueDate === today) {
          todayList.push(currItem)
        }
      }
    }
    todayList.sort()
    return todayList
  }

  const getWeekList = () => {
    let weekList = []
    const dayName = Date().split(' ').splice(0, 1).join('')
    const dayNumber = Date().split(' ').splice(2, 1).join('')
    const month = Date().split(' ').splice(1, 1).join('')
    const year = Date().split(' ').splice(3, 1).join('')
    for (const list in todoLists) {
      let numOfItems = todoLists[list].length
      for (let i = 0; i < numOfItems; i++) {
        const currItem = todoLists[list][i]
        const currItemYear = currItem.dueDate.split(' ')[3]
        const currItemMonth = currItem.dueDate.split(' ')[1]
        const currItemDayNumber = currItem.dueDate.split(' ')[2]
        const currItemDayName = currItem.dueDate.split(' ')[0]
        }
        weekList.push(currItem)
      }
    const week = Date().split(' ').splice()

    return weekList
  }

  const getMonthList = () => {
    let monthList = []
    const month = Date().split(' ').splice(1, 1).join('')
    for (const list in todoLists) {
      let numOfItems = todoLists[list].length
      for (let i = 0; i < numOfItems; i++) {
        const currItem = todoLists[list][i]
        if (currItem.dueDate.split(' ')[1] === month) {
          monthList.push(currItem)
        }
      }
    }
    function compare(day1, day2) {
      return day1 === day2 ? 0 : day1 > day2 ? 1 : -1
    }
    monthList.sort((a, b) => compare(a.dueDate.split(' ')[2], b.dueDate.split(' ')[2]))
    return monthList
  }

  const createNewList = (title = 'My List') => {
    const count = Object.keys(todoLists).length

    const list = [
      {
        "title": "My Title",
        "description": "My Description",
        "dueDate": Date().split(' ').splice(0, 4).join(' '),
        "priority": 1,
        "complete": false
      }
    ]

    if (title === 'My List' && count > 0) {
      title += ` ${count + 1}`
    }

    todoLists[title] = list

    return "List created successfully"
  }

  const addItem = (list) => {

    const item = {
      "title": "My Title",
      "description": "My Description",
      "dueDate": Date().split(' ').splice(0, 4).join(' '),
      "priority": 1,
      "complete": false
    }

    list.push(item)

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
    list,
    index,
    title = list[index].title,
    description = list[index].description,
    dueDate = list[index].dueDate,
    priority = list[index].priority,
    complete = list[index].complete
  ) => {
    list[index] = {
      "title": title,
      "description": description,
      "dueDate": dueDate,
      "priority": priority,
      "complete": complete
    }

    return 'Item updated successfully'
  }

  const deleteItem = (list, index) => {

    todoLists[list].splice(index, 1)

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