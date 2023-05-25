export default function singleList(listOfLists, list) {
    const title = document.createElement('h1');
    title.textContent = list;
    title.style.textAlign = 'center';
    const container = document.createElement('div');
    container.appendChild(title);
    const currList = listOfLists.getAllLists()[list]

    for (const item in currList) {
        const task = document.createElement('div');
        task.classList.add('task');
        const taskTitle = document.createElement('p');
        taskTitle.classList.add('title', 'prop');
        taskTitle.textContent = currList[item].title;
        const taskDesc = document.createElement('p');
        taskDesc.classList.add('desc', 'prop');
        taskDesc.textContent = currList[item].description;

        const taskPriority = document.createElement('select');
        taskPriority.classList.add('priority', 'prop');
        const taskPriorityOption1 = document.createElement('option');
        taskPriorityOption1.value = taskPriorityOption1.text = 1;
        const taskPriorityOption2 = document.createElement('option');
        taskPriorityOption2.value = taskPriorityOption2.text = 2;
        const taskPriorityOption3 = document.createElement('option');
        taskPriorityOption3.value = taskPriorityOption3.text = 3;
        const taskPriorityOption4 = document.createElement('option');
        taskPriorityOption4.value = taskPriorityOption4.text = 4;
        const taskPriorityOption5 = document.createElement('option');
        taskPriorityOption5.value = taskPriorityOption5.text = 5;
        taskPriority.appendChild(taskPriorityOption1);
        taskPriority.appendChild(taskPriorityOption2);
        taskPriority.appendChild(taskPriorityOption3);
        taskPriority.appendChild(taskPriorityOption4);
        taskPriority.appendChild(taskPriorityOption5);
        taskPriority.selectedIndex = currList[item].priority - 1;
        taskPriority.classList.add('priority', 'prop');

        taskPriority.addEventListener('change', e => {
            listOfLists.updatePriority(currList[item], e.target.value);
        });

        task.style.backgroundColor = currList[item].complete ? '#0f6e22' : '#7a0610';

        task.addEventListener('click', e => {
            if (e.target.localName === 'p' || e.target.localName === 'select') {
                return
            }

            listOfLists.updateComplete(currList[item], !currList[item].complete)
            task.style.backgroundColor = currList[item].complete ? '#0f6e22' : '#7a0610'
        })

        task.appendChild(taskTitle);
        task.appendChild(taskDesc);
        task.appendChild(taskPriority);
        container.appendChild(task);
    }
    return container
}