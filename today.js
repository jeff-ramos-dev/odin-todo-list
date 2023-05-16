import allTasks from './all-tasks.js'

export default function todayPage() {
    const title = document.createElement('h1');
    title.textContent = 'TODAY'
    const container = document.createElement('div');
    container.appendChild(title);

    const allTasksObject = allTasks()
    const taskLists = allTasksObject.lists

    for (const list in taskLists) {
        const numOfItems = taskLists[list].length
        for (let i = 0; i < numOfItems; i++) {
            const curr = taskLists[list][i]
            const date = curr['dueDate']
            const currDay = Date().split(' ').splice(1, 3).join(' ');
            if (date === currDay) {
                const todayTask = document.createElement('div');               
                todayTask.classList.add('task');
                const todayTitle = document.createElement('p');
                todayTitle.classList.add('title', 'prop');
                todayTitle.textContent = curr['title']
                const todayDesc = document.createElement('p');
                todayDesc.classList.add('desc', 'prop');
                todayDesc.textContent = curr['description']
                const todayPriority = document.createElement('p');
                todayPriority.classList.add('priority', 'prop');
                todayPriority.textContent = `Priority: ${curr['priority']}`
                const taskComplete = document.createElement('input');
                taskComplete.classList.add('checkbox', 'prop');
                taskComplete.type = 'checkbox';
                taskComplete.checked = curr['complete'];
                todayTask.style.backgroundColor = curr['complete'] ? '#0f6e22': '#7a0610';
                taskComplete.addEventListener('input', e => {
                    curr['complete'] = e.target.checked
                    todayTask.style.backgroundColor = e.target.checked ? '#0f6e22' : '#7a0610'
                })


                todayTask.appendChild(todayTitle);
                todayTask.appendChild(todayDesc);
                todayTask.appendChild(todayPriority);
                todayTask.appendChild(taskComplete);
                container.appendChild(todayTask);
            }
        }
    }

    return container 
}