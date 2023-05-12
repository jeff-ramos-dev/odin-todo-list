function createNewList(title = 'My List') {
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

  if (title === 'My List') {
    title += ` ${count + 1}`
  }

  todoLists[title] = list

  return "List created successfully"
}

function addItem(list) {

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

function updateItem(
  list,
  index,
  title = todoLists[list][index].title,
  description = todoLists[list][index].description,
  dueDate = todoLists[list][index].dueDate,
  priority = todoLists[list][index].priority,
  complete = todoLists[list][index].complete
) {
  todoLists[list][index] = {
    "title": title,
    "description": description,
    "dueDate": dueDate,
    "priority": priority,
    "complete": complete
  }

  return 'Item updated successfully'
}

function deleteItem(list, index) {

  todoLists[list].splice(index, 1)

  return 'Item deleted successfully'
}


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

console.log(todoLists)