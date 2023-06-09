import smallPlusIcon from '../images/small-plus-icon-update.png'
import createTodo from './createTodo'

export function buildAllListsPage(listOfLists) {
  const allLists = listOfLists.getAllLists()

  const allUserTodos = document.createElement('div');
  allUserTodos.classList.add('page', 'allLists-page');

  for (const listName in allLists) {
    const listWrapper = document.createElement('div');
    listWrapper.classList.add('container')
    const listTitle = document.createElement('h1')
    listTitle.classList.add('list-title');
    listTitle.textContent = listName;
    allUserTodos.appendChild(listTitle);

    if (allLists[listName].length === 0) {
      allUserTodos.appendChild(listWrapper);
    } else {
      for (const index in allLists[listName]) {
        let currTodo = allLists[listName][index]
        const todo = createTodo(listOfLists, currTodo);
        listWrapper.appendChild(todo);
        allUserTodos.appendChild(listWrapper);
      }
    }

    const addButton = new Image()
    addButton.src = smallPlusIcon
    addButton.classList.add('add');

    addButton.addEventListener('click', e => {
      listOfLists.addItem(listName);
      let lastTodo = allLists[listName][allLists[listName].length - 1]
      const newTask = createTodo(listOfLists, lastTodo);
      listWrapper.appendChild(newTask);
      listWrapper.removeChild(addButton);
      listWrapper.appendChild(addButton);
    })
    listWrapper.appendChild(addButton);
  };

  return allUserTodos;
}

export function buildUserListPage(listOfLists, listName) {
  const userList = document.createElement('div');
  userList.classList.add('page', 'userList-page');

  const title = document.createElement('h1');
  title.textContent = listName;
  title.style.textAlign = 'center';
  userList.appendChild(title);

  const listWrapper = document.createElement('div');
  listWrapper.classList.add('container');

  const currList = listOfLists.getAllLists()[listName]

  for (const index in currList) {
    let currTodo = currList[index]
    const todo = createTodo(listOfLists, currTodo)
    listWrapper.appendChild(todo);
  }

  userList.appendChild(listWrapper)
  const addButton = document.createElement('button');
  addButton.textContent = '+';
  addButton.classList.add('add');

  addButton.addEventListener('click', e => {
    listOfLists.addItem(listName);
    let list = listOfLists.getAllLists()[listName]
    lastTodo = list[list.length - 1]
    const newTask = createTodo(listOfLists, lastTodo);
    listWrapper.appendChild(newTask);
    listWrapper.removeChild(addButton);
    listWrapper.appendChild(addButton);
  })
  listWrapper.appendChild(addButton);
  return userList
}

export function buildTodayPage(listOfLists) {
  const todayList = listOfLists.getTodayList()

  const title = document.createElement('h1');
  title.textContent = 'TODAY'
  title.style.textAlign = 'center'

  const todayTodos = document.createElement('div');
  todayTodos.classList.add('page', 'today-page')
  todayTodos.style.paddingTop = '120px';
  todayTodos.appendChild(title);
  const listWrapper = document.createElement('div');
  listWrapper.classList.add('container');
  todayTodos.appendChild(listWrapper);

  for (const index in todayList) {
    const todayTodo = createTodo(listOfLists, todayList[index]);
    listWrapper.appendChild(todayTodo);
  }

  return todayTodos
}

export function buildWeekPage(listOfLists) {
  const weekList = listOfLists.getWeekList();

  const title = document.createElement('h1');
  title.textContent = 'THIS WEEK'
  title.style.textAlign = 'center'

  const weekTodos = document.createElement('div');
  weekTodos.classList.add('page', 'week-page');
  weekTodos.appendChild(title);

  const listWrapper = document.createElement('div');
  listWrapper.classList.add('container');
  weekTodos.appendChild(listWrapper);

  for (const index in weekList) {
    const weekTodo = createTodo(listOfLists, weekList[index]);
    listWrapper.appendChild(weekTodo);
  }

  return weekTodos
}

export function buildMonthPage(listOfLists) {
  const monthList = listOfLists.getMonthList()

  const title = document.createElement('h1');
  title.textContent = 'THIS MONTH'
  title.style.textAlign = 'center'

  const monthTodos = document.createElement('div');
  monthTodos.classList.add('page', 'month-page');
  monthTodos.appendChild(title);

  const listWrapper = document.createElement('div');
  listWrapper.classList.add('container');
  monthTodos.appendChild(listWrapper);

  for (const index in monthList) {
    const monthTodo = createTodo(listOfLists, monthList[index]);
    listWrapper.appendChild(monthTodo);
  }

  return monthTodos
}