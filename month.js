export default function monthPage(listOfLists) {
    const monthList = listOfLists.getMonthList()

    const title = document.createElement('h1');
    title.textContent = 'THIS MONTH'
    title.style.textAlign = 'center'
    const container = document.createElement('div');
    container.appendChild(title);

    for (const item in monthList) {
        const monthTask = document.createElement('div');               
        monthTask.classList.add('task');
        const monthTitle = document.createElement('p');
        monthTitle.classList.add('title', 'prop');
        monthTitle.textContent = monthList[item].title
        const monthDesc = document.createElement('p');
        monthDesc.classList.add('desc', 'prop');
        monthDesc.textContent = monthList[item].description
        const monthPriority = document.createElement('p');
        monthPriority.classList.add('priority', 'prop');
        monthPriority.textContent = `Priority: ${monthList[item].priority}`

        monthTask.style.backgroundColor = monthList[item].complete ? '#0f6e22': '#7a0610';
        monthTask.addEventListener('click', e => {
            listOfLists.updateComplete(monthList[item], !monthList[item].complete)
            monthTask.style.backgroundColor = monthList[item].complete ? '#0f6e22' : '#7a0610'
        })
        monthTask.appendChild(monthTitle);
        monthTask.appendChild(monthDesc);
        monthTask.appendChild(monthPriority);
        container.appendChild(monthTask);
    }

    return container 
}