export default function weekPage(listOfLists) {
  const weekList = listOfLists.getWeekList()

  const title = document.createElement('h1');
  title.textContent = 'THIS WEEK'
  title.style.textAlign = 'center'
  const container = document.createElement('div');
  container.appendChild(title);

//   for (const item in weekList) {
//     const weekTask = document.createElement('div');
//     weekTask.classList.add('task');
//     const weekTitle = document.createElement('p');
//     weekTitle.classList.add('title', 'prop');
//     weekTitle.textContent = weekList[item].title
//     const weekDesc = document.createElement('p');
//     weekDesc.classList.add('desc', 'prop');
//     weekDesc.textContent = weekList[item].description

//     const weekPriority = document.createElement('select');
//     weekPriority.classList.add('priority', 'prop');
//     const taskPriorityOption1 = document.createElement('option')
//     taskPriorityOption1.value = taskPriorityOption1.text = 1
//     const taskPriorityOption2 = document.createElement('option')
//     taskPriorityOption2.value = taskPriorityOption2.text = 2
//     const taskPriorityOption3 = document.createElement('option')
//     taskPriorityOption3.value = taskPriorityOption3.text = 3
//     const taskPriorityOption4 = document.createElement('option')
//     taskPriorityOption4.value = taskPriorityOption4.text = 4
//     const taskPriorityOption5 = document.createElement('option')
//     taskPriorityOption5.value = taskPriorityOption5.text = 5
//     weekPriority.appendChild(taskPriorityOption1)
//     weekPriority.appendChild(taskPriorityOption2)
//     weekPriority.appendChild(taskPriorityOption3)
//     weekPriority.appendChild(taskPriorityOption4)
//     weekPriority.appendChild(taskPriorityOption5)
//     weekPriority.selectedIndex = weekList[item].priority - 1
//     weekPriority.classList.add('priority', 'prop');
//     weekPriority.addEventListener('change', e => {
//       listOfLists.updatePriority(weekList[item], e.target.value)
//     })

//     weekTask.style.backgroundColor = weekList[item].complete ? '#0f6e22' : '#7a0610';
//     weekTask.addEventListener('click', e => {
//       if (e.target.localName === 'p' || e.target.localName === 'select') {
//         return
//       }
//       listOfLists.updateComplete(weekList[item], !weekList[item].complete)
//       weekTask.style.backgroundColor = weekList[item].complete ? '#0f6e22' : '#7a0610'
//     })
//     const currDay = Date().split(' ').splice(1, 3).join(' ');
//     if (currDay === weekList[item].dueDate) {
//       const todayMarker = document.createElement('p');
//       todayMarker.classList.add('marker');
//       todayMarker.textContent = 'Today';
//       weekTask.appendChild(todayMarker);
//     }

//     weekTask.appendChild(weekTitle);
//     weekTask.appendChild(weekDesc);
//     weekTask.appendChild(weekPriority);
//     container.appendChild(weekTask);
//   }

  return container
}