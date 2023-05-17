export default function todayPage(listOfLists) {
    const allLists = listOfLists.getAllLists()

    const title = document.createElement('h1');
    title.textContent = 'TODAY'
    title.style.textAlign = 'center'
    const container = document.createElement('div');
    container.appendChild(title);

    for (const list in allLists) {
        const numOfItems = allLists[list].length
        for (let i = 0; i < numOfItems; i++) {
            const curr = allLists[list][i]
            const date = curr['dueDate']
            const currDay = Date().split(' ').splice(1, 3).join(' ');
            if (date === currDay) {
                const todayTask = document.createElement('div');               
                todayTask.classList.add('task');
                const todayTitle = document.createElement('p');
                todayTitle.classList.add('title', 'prop');
                todayTitle.textContent = curr.title
                const todayDesc = document.createElement('p');
                todayDesc.classList.add('desc', 'prop');
                todayDesc.textContent = curr.description
                const todayPriority = document.createElement('p');
                todayPriority.classList.add('priority', 'prop');
                todayPriority.textContent = `Priority: ${curr.priority}`

                todayTask.style.backgroundColor = curr.complete ? '#0f6e22': '#7a0610';
                todayTask.addEventListener('click', e => {
                    listOfLists.updateComplete(curr, !curr.complete)
                    todayTask.style.backgroundColor = curr.complete ? '#0f6e22' : '#7a0610'
                })


                todayTask.appendChild(todayTitle);
                todayTask.appendChild(todayDesc);
                todayTask.appendChild(todayPriority);
                container.appendChild(todayTask);
            }
        }
    }

    return container 
}