export default function allTasks(listOfLists) {
  const allLists = listOfLists.getAllLists()

  const allTaskContainer = document.createElement('div');
  allTaskContainer.classList.add('container');

  const today = document.createElement('div');

  const todayList = document.createElement('h1');
  todayList.classList.add('list-name')
  todayList.textContent = 'TODAY'

  const todayTasks = document.createElement('div');

  today.appendChild(todayList);
  today.appendChild(todayTasks);

  const currDay = Date().split(' ').splice(1, 3).join(' ');

  for (const list in allLists) {
    let curr = allLists[list]
      const listWrapper = document.createElement('div');
      const listName = document.createElement('h1')
      listName.classList.add('list-name');
      listName.textContent = list
      listWrapper.appendChild(listName)
    for (const item in curr) {
      let isToday = false
      const task = document.createElement('div');
      task.classList.add('task');
      const taskTitle = document.createElement('p');
      taskTitle.classList.add('title', 'prop');
      taskTitle.textContent += curr[item].title
      const taskDesc = document.createElement('p');
      taskDesc.classList.add('desc', 'prop');
      taskDesc.textContent += curr[item].description
      const taskDueDate = document.createElement('p');
      taskDueDate.classList.add('date', 'prop');
      taskDueDate.textContent += curr[item].dueDate
      const taskPriority = document.createElement('p');
      taskPriority.classList.add('priority', 'prop');
      taskPriority.textContent += `Priority: ${curr[item].priority}`


      task.style.backgroundColor = curr[item].complete ? '#0f6e22' : '#7a0610'
      task.appendChild(taskTitle);
      task.appendChild(taskDesc);
      task.appendChild(taskDueDate);
      task.appendChild(taskPriority);
      listWrapper.appendChild(task)
      allTaskContainer.appendChild(listWrapper)

      if (currDay === curr[item].dueDate) {
        isToday = true
        const todayTask = document.createElement('div');
        todayTask.classList.add('task')
        const todayTitle = document.createElement('p');
        todayTitle.classList.add('title', 'prop');
        todayTitle.textContent = curr[item].title;
        const todayDesc = document.createElement('p');
        todayDesc.classList.add('desc', 'prop');
        todayDesc.textContent = curr[item].description;
        todayTask.style.backgroundColor = curr[item].complete ? '#0f6e22' : '#7a0610';

        task.addEventListener('click', e => {
          listOfLists.updateComplete(curr[item], !curr[item].complete)
          task.style.backgroundColor = curr[item].complete ? '#0f6e22' : '#7a0610'
          if (currDay === curr[item].dueDate) {
            todayTask.style.backgroundColor = curr[item].complete ? '#0f6e22' : '#7a0610'
          }
        })

        todayTask.appendChild(todayTitle);
        todayTask.appendChild(todayDesc);
        today.appendChild(todayTask)
      } 

      if (!isToday) {
        task.addEventListener('click', e => {
          listOfLists.updateComplete(curr[item], !curr[item].complete)
          task.style.backgroundColor = curr[item].complete ? '#0f6e22' : '#7a0610'
        }) 
      }
    }
  }
  allTaskContainer.appendChild(today);

  return allTaskContainer
}
