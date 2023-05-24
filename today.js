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
        const todayPriority = document.createElement('p');
        todayPriority.classList.add('priority', 'prop');
        todayPriority.textContent = `Priority: ${todayList[item].priority}`

        todayTask.style.backgroundColor = todayList[item].complete ? '#0f6e22': '#7a0610';
        todayTask.addEventListener('click', e => {
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