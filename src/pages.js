import format from "date-fns/format";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";

export function createTodo(listOfLists, listName, index) {
  const todo = document.createElement('div');
  todo.classList.add('todo');
  const list = listOfLists.getAllLists()[listName]

  const title = document.createElement('p');
  title.classList.add('title', 'prop');
  title.textContent = list[index].title

  const desc = document.createElement('p');
  desc.classList.add('desc', 'prop');
  desc.textContent = list[index].description

  const dueDate = document.createElement('p');
  dueDate.classList.add('date', 'prop');
  dueDate.textContent = format(list[index].dueDate, 'eee MMM d yyy');

  const priority = document.createElement('select');
  priority.classList.add('priority', 'prop');

  const option1 = document.createElement('option')
  option1.value = option1.text = 1
  const option2 = document.createElement('option')
  option2.value = option2.text = 2
  const option3 = document.createElement('option')
  option3.value = option3.text = 3
  const option4 = document.createElement('option')
  option4.value = option4.text = 4
  const option5 = document.createElement('option')
  option5.value = option5.text = 5

  priority.appendChild(option1)
  priority.appendChild(option2)
  priority.appendChild(option3)
  priority.appendChild(option4)
  priority.appendChild(option5)
  priority.selectedIndex = list[index].priority - 1
  priority.classList.add('priority', 'prop');
  priority.addEventListener('change', e => {
    listOfLists.updatePriority(list[index], e.target.value)
  })

  todo.style.backgroundColor = list[index].complete ? '#0f6e22' : '#7a0610';

  todo.addEventListener('click', e => {
    if (e.target.localName === 'p' ||
      e.target.localName === 'select' ||
      e.target.localName === 'button') {
      return
    }
    listOfLists.updateComplete(list[index], !list[index].complete)
    todo.style.backgroundColor = list[index].complete ? '#0f6e22' : '#7a0610'
    if (todo.querySelector('.past-due') && list[index].complete) {
      todo.removeChild(todo.querySelector('.past-due'))
    } else if (
      !todo.querySelector('.past-due') &&
      !list[index].complete &&
      differenceInCalendarDays(list[index].dueDate, today) < 0
    ) {
      const pastDueMarker = document.createElement('p');
      pastDueMarker.classList.add('marker', 'past-due');
      pastDueMarker.textContent = 'Past Due';
      todo.appendChild(pastDueMarker);
    }
  })

  const today = new Date();

  if (differenceInCalendarDays(list[index].dueDate, today) === 0) {
    const todayMarker = document.createElement('p');
    todayMarker.classList.add('marker');
    todayMarker.textContent = 'Today';
    todo.appendChild(todayMarker);
  } else if (
    differenceInCalendarDays(list[index].dueDate, today) < 0 &&
    !list[index].complete
  ) {
    const pastDueMarker = document.createElement('p');
    pastDueMarker.classList.add('marker', 'past-due');
    pastDueMarker.textContent = 'Past Due';
    todo.appendChild(pastDueMarker);
  }

  const id = listOfLists.getAllLists()[listName][index].id

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.classList.add('delete');
  deleteButton.addEventListener('click', e => {
    let page = document.querySelector('.page')
    document.body.removeChild(page)
    listOfLists.deleteItem(listName, id);
    if (page.classList.contains('allLists-page')) {
      page = buildAllListsPage(listOfLists)
    } else {
      page = buildUserListPage(listOfLists, listName)
    }
    document.body.appendChild(page)
  });

  todo.appendChild(title);
  todo.appendChild(desc);
  todo.appendChild(dueDate);
  todo.appendChild(priority);
  todo.appendChild(deleteButton);
  return todo
}

export function createTimedTodo(listOfLists, list, index) {
  const todo = document.createElement('div');
  todo.classList.add('todo');

  const title = document.createElement('p');
  title.classList.add('title', 'prop');
  title.textContent = list[index].title

  const desc = document.createElement('p');
  desc.classList.add('desc', 'prop');
  desc.textContent = list[index].description

  const dueDate = document.createElement('p');
  dueDate.classList.add('date', 'prop');
  dueDate.textContent = format(list[index].dueDate, 'eee MMM d yyy');

  const priority = document.createElement('select');
  priority.classList.add('priority', 'prop');

  const option1 = document.createElement('option')
  option1.value = option1.text = 1
  const option2 = document.createElement('option')
  option2.value = option2.text = 2
  const option3 = document.createElement('option')
  option3.value = option3.text = 3
  const option4 = document.createElement('option')
  option4.value = option4.text = 4
  const option5 = document.createElement('option')
  option5.value = option5.text = 5

  priority.appendChild(option1)
  priority.appendChild(option2)
  priority.appendChild(option3)
  priority.appendChild(option4)
  priority.appendChild(option5)
  priority.selectedIndex = list[index].priority - 1
  priority.classList.add('priority', 'prop');
  priority.addEventListener('change', e => {
    listOfLists.updatePriority(list[index], e.target.value)
  })

  todo.style.backgroundColor = list[index].complete ? '#0f6e22' : '#7a0610';

  todo.addEventListener('click', e => {
    if (e.target.localName === 'p' ||
      e.target.localName === 'select' ||
      e.target.localName === 'button') {
      return
    }
    listOfLists.updateComplete(list[index], !list[index].complete)
    todo.style.backgroundColor = list[index].complete ? '#0f6e22' : '#7a0610'
    if (todo.querySelector('.past-due') && list[index].complete) {
      todo.removeChild(todo.querySelector('.past-due'))
    } else if (
      !todo.querySelector('.past-due') &&
      !list[index].complete &&
      differenceInCalendarDays(list[index].dueDate, today) < 0
    ) {
      const pastDueMarker = document.createElement('p');
      pastDueMarker.classList.add('marker', 'past-due');
      pastDueMarker.textContent = 'Past Due';
      todo.appendChild(pastDueMarker);
    }
  })

  const today = new Date();

  if (differenceInCalendarDays(list[index].dueDate, today) === 0) {
    const todayMarker = document.createElement('p');
    todayMarker.classList.add('marker');
    todayMarker.textContent = 'Today';
    todo.appendChild(todayMarker);
  } else if (
    differenceInCalendarDays(list[index].dueDate, today) < 0 &&
    !list[index].complete
  ) {
    const pastDueMarker = document.createElement('p');
    pastDueMarker.classList.add('marker', 'past-due');
    pastDueMarker.textContent = 'Past Due';
    todo.appendChild(pastDueMarker);
  }

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.classList.add('delete');
  deleteButton.addEventListener('click', e => {
    let page = document.querySelector('.page');
    document.body.removeChild(page);
    listOfLists.deleteItem(list[index].parentList, list[index].id);
    if (page.classList.contains('today-page')) {
      page = buildTodayPage(listOfLists);
    } else if (page.classList.contains('week-page')) {
      page = buildWeekPage(listOfLists);
    } else {
      page = buildMonthPage(listOfLists);
    }
    document.body.appendChild(page);
  });

  todo.appendChild(title);
  todo.appendChild(desc);
  todo.appendChild(dueDate);
  todo.appendChild(priority);
  todo.appendChild(deleteButton);
  return todo
}

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

    for (const index in allLists[listName]) {
      const todo = createTodo(listOfLists, listName, index);
      listWrapper.appendChild(todo);
      allUserTodos.appendChild(listWrapper);
    }
    if (allLists[listName].length === 0) {
      allUserTodos.appendChild(listWrapper);
    }

    const addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.classList.add('add');

    addButton.addEventListener('click', e => {
      listOfLists.addItem(listName);
      const newTask = createTodo(listOfLists, listName, allLists[listName].length - 1);
      listWrapper.appendChild(newTask);
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
    const todo = createTodo(listOfLists, listName, index)
    listWrapper.appendChild(todo);
  }

  userList.appendChild(listWrapper)
  const addButton = document.createElement('button');
  addButton.textContent = '+';
  addButton.classList.add('add');

  addButton.addEventListener('click', e => {
    listOfLists.addItem(listName);
    const newTask = createTodo(listOfLists, listName, listOfLists.getAllLists()[listName].length - 1);
    listWrapper.appendChild(newTask);
  })
  userList.appendChild(addButton);
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
    const todayTodo = createTimedTodo(listOfLists, todayList, index);
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
    const weekTodo = createTimedTodo(listOfLists, weekList, index);
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
    const monthTodo = createTimedTodo(listOfLists, monthList, index);
    listWrapper.appendChild(monthTodo);
  }

  return monthTodos
}