export default function todayPage(listOfLists) {
    const todayList = listOfLists.getTodayList()

    const title = document.createElement('h1');
    title.textContent = 'TODAY'
    title.style.textAlign = 'center'
    const container = document.createElement('div');
    container.appendChild(title);

    for (const item in todayList) {
        const todayTask = document.createElement('div');               
        todayTask.classList.add('task');
        const todayTitle = document.createElement('p');
        todayTitle.classList.add('title', 'prop');
        todayTitle.textContent = todayList[item].title
        const todayDesc = document.createElement('p');
        todayDesc.classList.add('desc', 'prop');
        todayDesc.textContent = todayList[item].description
        const todayPriority = document.createElement('select');
        todayPriority.classList.add('priority', 'prop');
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
        todayPriority.appendChild(taskPriorityOption1)
        todayPriority.appendChild(taskPriorityOption2)
        todayPriority.appendChild(taskPriorityOption3)
        todayPriority.appendChild(taskPriorityOption4)
        todayPriority.appendChild(taskPriorityOption5)
        todayPriority.selectedIndex = todayList[item].priority
        todayPriority.classList.add('priority', 'prop');
        todayPriority.addEventListener('onchange', e => {
            listOfLists.updatePriority(todayList[item], e.target.value)
        })
        todayPriority.textContent = `Priority: ${todayList[item].priority}`

        todayTask.style.backgroundColor = todayList[item].complete ? '#0f6e22': '#7a0610';
        todayTask.addEventListener('click', e => {
          if (e.target.localName === 'p' || e.target.localName === 'select') {
            return
          }
            listOfLists.updateComplete(todayList[item], !todayList[item].complete)
            todayTask.style.backgroundColor = todayList[item].complete ? '#0f6e22' : '#7a0610'
        })
        todayTask.appendChild(todayTitle);
        todayTask.appendChild(todayDesc);
        todayTask.appendChild(todayPriority);
        container.appendChild(todayTask);
    }

    return container 
}