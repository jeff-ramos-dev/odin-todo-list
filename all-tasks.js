export default function allTasks(listOfLists) {
  const allLists = listOfLists.getAllLists()

  const allTaskContainer = document.createElement('div');
  allTaskContainer.classList.add('container');

  const currDay = Date().split(' ').splice(1, 3).join(' ');

  for (const list in allLists) {
    let curr = allLists[list]
      const listWrapper = document.createElement('div');
      const listName = document.createElement('h1')
      listName.classList.add('list-name');
      listName.textContent = list
      listWrapper.appendChild(listName)
    for (const item in curr) {
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
      listWrapper.appendChild(task);
      allTaskContainer.appendChild(listWrapper);

      if (currDay === curr[item].dueDate) {
        const todayMarker = document.createElement('p');
        todayMarker.classList.add('marker');
        todayMarker.textContent = 'Today';
        task.appendChild(todayMarker);
      }

        task.addEventListener('click', e => {
          listOfLists.updateComplete(curr[item], !curr[item].complete);
          task.style.backgroundColor = curr[item].complete ? '#0f6e22' : '#7a0610';
        })
    }
  }
  return allTaskContainer
}
