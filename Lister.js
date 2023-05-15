export default function Lister() {

  const todoLists = {
    "My List": [
      {
        "title": "My Title",
        "description": "My Description",
        "dueDate": Date().split(' ').splice(1, 3).join(' '),
        "priority": 1,
        "complete": false
      },
    ]
  }

  const getAllLists = () => todoLists

  const getToday = () => {
    for (const list in todoLists) {
      console.log(list.dueDate)
    }
  }

  const createNewList = (title = 'My List') => {
    const count = Object.keys(todoLists).length

    const list = [
      {
        "title": "My Title",
        "description": "My Description",
        "dueDate": Date().split(' ').splice(1, 3).join(' '),
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
      "dueDate": Date().split(' ').splice(1, 3).join(' '),
      "priority": 1,
      "complete": false
    }

    list.push(item)

    return "Item added successfully"
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
    getToday,
    createNewList,
    addItem,
    updateItem,
    deleteItem,
    deleteList,
  }
}