import smallPlusIcon from '../images/small-plus-icon-update.png'
import createTodo from './createTodo'

export function buildAllListsPage(listOfLists) {
  const allLists = listOfLists.getAllLists()

  const allListsPage = document.createElement('div');
  allListsPage.classList.add('page', 'allLists-page');

  for (const listName in allLists) {
    const listContainer = document.createElement('div');
    listContainer.classList.add('container')
    const listTitle = document.createElement('h1')
    listTitle.classList.add('list-title');
    listTitle.textContent = listName;
    allListsPage.appendChild(listTitle);

    if (allLists[listName].length === 0) {
      allListsPage.appendChild(listContainer);
    } else {
      for (const index in allLists[listName]) {
        const currTodo = allLists[listName][index]
        const todoContainer = createTodo(listOfLists, currTodo);
        listContainer.appendChild(todoContainer);
        allListsPage.appendChild(listContainer);
      }
    }

    const addButton = new Image()
    addButton.src = smallPlusIcon
    addButton.classList.add('add');

    addButton.addEventListener('click', e => {
      listOfLists.addTodo(listName);
      const newTodo = allLists[listName][allLists[listName].length - 1]
      const newTodoContainer = createTodo(listOfLists, newTodo);
      listContainer.appendChild(newTodoContainer);
      listContainer.removeChild(addButton);
      listContainer.appendChild(addButton);
    })

    listContainer.appendChild(addButton);
  };

  return allListsPage;
}

export function buildUserListPage(listOfLists, listName) {
  const userListPage = document.createElement('div');
  userListPage.classList.add('page', 'userList-page');

  const title = document.createElement('h1');
  title.textContent = listName;
  title.style.textAlign = 'center';
  userListPage.appendChild(title);

  const listContainer = document.createElement('div');
  listContainer.classList.add('container');

  const currList = listOfLists.getAllLists()[listName]

  for (const index in currList) {
    const currTodo = currList[index]
    const todoContainer = createTodo(listOfLists, currTodo)
    listContainer.appendChild(todoContainer);
  }

  userListPage.appendChild(listContainer)

  const addButton = new Image()
  addButton.src = smallPlusIcon
  addButton.classList.add('add');

  addButton.addEventListener('click', e => {
    listOfLists.addTodo(listName);
    const list = listOfLists.getAllLists()[listName]
    const newTodo = list[list.length - 1]
    const newTodoContainer = createTodo(listOfLists, newTodo);
    listContainer.appendChild(newTodoContainer);
    listContainer.removeChild(addButton);
    listContainer.appendChild(addButton);
  })
  listContainer.appendChild(addButton);
  return userListPage;
}

export function buildTodayPage(listOfLists) {
  const todayList = listOfLists.getTodayList()

  const title = document.createElement('h1');
  title.textContent = 'TODAY'
  title.style.textAlign = 'center'

  const todayPage = document.createElement('div');
  todayPage.classList.add('page', 'today-page')
  todayPage.style.paddingTop = '120px';
  todayPage.appendChild(title);

  const listContainer = document.createElement('div');
  listContainer.classList.add('container');
  todayPage.appendChild(listContainer);

  for (const index in todayList) {
    const todoContainer = createTodo(listOfLists, todayList[index]);
    listContainer.appendChild(todoContainer);
  }

  return todayPage
}

export function buildWeekPage(listOfLists) {
  const weekList = listOfLists.getWeekList();

  const title = document.createElement('h1');
  title.textContent = 'THIS WEEK'
  title.style.textAlign = 'center'

  const weekTodos = document.createElement('div');
  weekTodos.classList.add('page', 'week-page');
  weekTodos.appendChild(title);

  const listContainer = document.createElement('div');
  listContainer.classList.add('container');
  weekTodos.appendChild(listContainer);

  for (const index in weekList) {
    const todoContainer = createTodo(listOfLists, weekList[index]);
    listContainer.appendChild(todoContainer);
  }

  return weekTodos
}

export function buildMonthPage(listOfLists) {
  const monthList = listOfLists.getMonthList()

  const title = document.createElement('h1');
  title.textContent = 'THIS MONTH'
  title.style.textAlign = 'center'

  const monthPage = document.createElement('div');
  monthPage.classList.add('page', 'month-page');
  monthPage.appendChild(title);

  const listContainer = document.createElement('div');
  listContainer.classList.add('container');
  monthPage.appendChild(listContainer);

  for (const index in monthList) {
    const todoContainer= createTodo(listOfLists, monthList[index]);
    listContainer.appendChild(todoContainer);
  }

  return monthPage
}