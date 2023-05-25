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
      taskTitle.contentEditable = true
      taskTitle.addEventListener('input', e => {
        listOfLists.updateTitle(curr[item], e.target.textContent)
      })
      const taskDesc = document.createElement('p');
      taskDesc.classList.add('desc', 'prop');
      taskDesc.textContent += curr[item].description
      taskDesc.contentEditable = true
      taskDesc.addEventListener('input', e => {
        listOfLists.updateDesc(curr[item], e.target.textContent)
      })
      const taskDueDate = document.createElement('p');
      taskDueDate.classList.add('date', 'prop');
      taskDueDate.textContent += curr[item].dueDate
      const taskPriority = document.createElement('select');
      const taskPriorityOption1 = document.createElement('option')
      taskPriorityOption1.value = taskPriorityOption1.text = 1
      const taskPriorityOption2 = document.createElement('option')
      taskPriorityOption2.value = taskPriorityOption2.text = 2
      const taskPriorityOption3 = document.createElement('option')
      taskPriorityOption3.value = taskPriorityOption3.text = 3
      const taskPriorityOption4 = document.createElement('option')
      taskPriorityOption4.value = taskPriorityOption4.text = 4
      const taskPriorityOption5 = document.createElement('option')
      taskPriorityOption5.value = taskPriorityOption5.text = 5
      taskPriority.appendChild(taskPriorityOption1)
      taskPriority.appendChild(taskPriorityOption2)
      taskPriority.appendChild(taskPriorityOption3)
      taskPriority.appendChild(taskPriorityOption4)
      taskPriority.appendChild(taskPriorityOption5)
      taskPriority.selectedIndex = curr[item].priority
      taskPriority.classList.add('priority', 'prop');
      taskPriority.addEventListener('onchange', e => {
        listOfLists.updatePriority(curr[item], e.target.value)
      })


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
          if (e.target.localName === 'p' || e.target.localName === 'select') {
            return
          }
          listOfLists.updateComplete(curr[item], !curr[item].complete);
          task.style.backgroundColor = curr[item].complete ? '#0f6e22' : '#7a0610';
        })
    }
  }
  return allTaskContainer
}
