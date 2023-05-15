import Lister from './Lister.js'

function example() {
  const list = Lister()
  list.createNewList();
  list.addItem(list.getAllLists()["My List"])
  list.updateItem(list.getAllLists()["My List"], 1, "Task for Wednesday", "This is something I don't need to get done rn, but should do in the next couple days", 'May 17 2023', 4, false)
  list.updateItem(list.getAllLists()["My List 2"], 0, "List 2 Task", "This is something I have to do for List 2", undefined, 2, true)
  const listContent = list.getAllLists()

  return listContent
}


const allTasks = () => {
  const list = example()
  const div = document.createElement('div');
  div.classList.add('container');
  const today = document.createElement('div');
  const todayList = document.createElement('h1');
  todayList.classList.add('list-name')
  todayList.textContent = 'TODAY'
  const todayTasks = document.createElement('div');
  today.appendChild(todayList);
  today.appendChild(todayTasks);
  const currDay = Date().split(' ').splice(1, 3).join(' ');

  for (const key in list) {
    let curr = list[key]
      const listWrapper = document.createElement('div');
      const listName = document.createElement('h1')
      listName.classList.add('list-name');
      listName.textContent = key
      listWrapper.appendChild(listName)
    for (const l in curr) {
      let isToday = false
      const task = document.createElement('div');
      task.classList.add('task');
      const taskTitle = document.createElement('p');
      taskTitle.classList.add('title', 'prop');
      taskTitle.textContent += curr[l]['title']
      const taskDesc = document.createElement('p');
      taskDesc.classList.add('desc', 'prop');
      taskDesc.textContent += curr[l]['description']
      const taskDueDate = document.createElement('p');
      taskDueDate.classList.add('date', 'prop');
      taskDueDate.textContent += curr[l]['dueDate']
      const taskPriority = document.createElement('p');
      taskPriority.classList.add('priority', 'prop');
      taskPriority.textContent += `Priority: ${curr[l]['priority']}`
      const taskComplete = document.createElement('input');
      taskComplete.classList.add('checkbox', 'prop');
      taskComplete.type = 'checkbox';
      taskComplete.checked = curr[l]['complete']

      task.style.backgroundColor = curr[l]['complete'] ? '#0f6e22' : '#7a0610'
      task.appendChild(taskTitle);
      task.appendChild(taskDesc);
      task.appendChild(taskDueDate);
      task.appendChild(taskPriority);
      task.appendChild(taskComplete);
      listWrapper.appendChild(task)
      div.appendChild(listWrapper)

      if (currDay === curr[l]['dueDate']) {
        isToday = true
        const todayTask = document.createElement('div');
        todayTask.classList.add('task')
        const todayTitle = document.createElement('p');
        todayTitle.classList.add('title', 'prop');
        todayTitle.textContent = curr[l]['title'];
        const todayDesc = document.createElement('p');
        todayDesc.classList.add('desc', 'prop');
        todayDesc.textContent = curr[l]['description'];
        todayTask.style.backgroundColor = curr[l]['complete'] ? '#0f6e22' : '#7a0610';

        taskComplete.addEventListener('input', e => {
          curr[l]['complete'] = e.target.checked
          task.style.backgroundColor = e.target.checked ? '#0f6e22' : '#7a0610'
          if (currDay === curr[l]['dueDate']) {
            todayTask.style.backgroundColor = e.target.checked ? '#0f6e22' : '#7a0610'
          }
        })

        todayTask.appendChild(todayTitle);
        todayTask.appendChild(todayDesc);
        today.appendChild(todayTask)
      } 

      if (!isToday) {
        taskComplete.addEventListener('input', e => {
          curr[l]['complete'] = e.target.checked
          task.style.backgroundColor = e.target.checked ? '#0f6e22' : '#7a0610'
        }) 
      }

    }
  }
  div.appendChild(today);
  return div
}


const div = allTasks()
document.body.appendChild(div);